import { AcademicSemester } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterServices } from './academicSemester.Services';
import { academicSemesterFilterAbleFileds } from './academicSemester.constant';

const insertintoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.insertintoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created',
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AcademicSemesterServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data fetched',
    meta: result.meta,
    data: result,
  });
});

const getDataById: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data fetched',
    data: result,
  });
});
const updateOneInDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});
export const AcademicSemesterController = {
  insertintoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
};
