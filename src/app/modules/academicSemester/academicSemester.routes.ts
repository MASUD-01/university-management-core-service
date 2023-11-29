import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.get('/:id', AcademicSemesterController.getDataById);
router.get('/', AcademicSemesterController.getAllFromDB);
router.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.insertintoDB
);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.updateOneInDB
);

export const AcademicSemesterRoutes = router;
