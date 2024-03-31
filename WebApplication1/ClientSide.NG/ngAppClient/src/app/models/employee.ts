import { Designation } from "./designation";
import { Experience } from "./experience";

export class Employee {
  id: number = 0;
  name!: string;
  designationId!: number;
  joinDate: Date = new Date();
  salary: number = 0.00;
  isActive: boolean = true;

  experiences: Experience[] = [];
  designation!: Designation;
}
