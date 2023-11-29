import { AcademicSemester, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RedisClient } from '../../../shared/redis';
import {
  AcademicSemesterSearchAbleFields,
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import { IAcademicSemesterFilterRequest } from './academicSemester.interface';

const insertintoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await prisma.academicSemester.create({
    data,
  });

  //46.2 video
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEMESTER_CREATED,
      JSON.stringify(result)
    );
  }
  return result;
};

const getAllFromDB = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: AcademicSemesterSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const reuslt = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options?.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page: 1,
      limit: 10,
    },
    data: reuslt,
  };
};
const getDataById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payload,
  });

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEMESTER_UPDATED,
      JSON.stringify(result)
    );
  }
  return result;
};
export const AcademicSemesterServices = {
  insertintoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
};
