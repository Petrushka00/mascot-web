export interface Employee{
  id: number;
  name: string;
  position: string;
  department: string;
  evaluation: number;
  status: 'active' | 'archived';

  //На будующее:
  // availability:
  //   | 'available'
  //   | 'busy'
  //   | 'partially_busy'
  //   | 'vacation'
  //   | 'sick_leave';
}
