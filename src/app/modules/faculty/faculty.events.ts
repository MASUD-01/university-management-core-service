import { RedisClient } from '../../../shared/redis';
import initStudentEvents from '../student/student.events';
import { EVENT_STUDENT_CREATED } from './../student/student.constants';
import { EVENT_FACULTY_UPDATED } from './faculty.constants';
import { FacultyService } from './faculty.service';

const initFacultyEvents = () => {
  RedisClient.subscribe(EVENT_STUDENT_CREATED, async (e: string) => {
    const data: FacultyCreatedEvent = JSON.parse(e);
    await FacultyService.createdFacultyFromEvent(data);
  });

  RedisClient.subscribe(EVENT_FACULTY_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await FacultyService.updateFacultyEvnetFrom(data);
  });
};

export default initStudentEvents;
