import { z } from 'zod';
const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is Required',
    }),
    title: z.string({
      required_error: 'title is Required',
    }),
    code: z.string({
      required_error: 'code is required',
    }),
    startMonth: z.string({
      required_error: 'startMonth is required',
    }),
    endMonth: z.string({
      required_error: 'endMonth is required',
    }),
  }),
});
export const AcademicSemesterValidation = {
  create,
};
