import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent implements OnInit {

  StudentList:any[]=[];
  itemsPerPage: number = 8;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  displayedStudentList: any[] = [];

  //for pagination

  // page: number = 1;
  // count: number = 0;
  // tableSize: number = 10;
  // tableSizes:any = [5,10,15,20];


  constructor(private service:StudentService, private router:ActivatedRoute) {
     this.totalPages = Math.ceil(this.StudentList.length / this.itemsPerPage);
  this.generatePageNumbers();
 }
 
  

 updateDisplayedStudentList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedStudentList = this.StudentList.slice(startIndex, endIndex);

  }
previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateDisplayedStudentList();
    this.generatePageNumbers();
  }
}
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedStudentList();
      this.generatePageNumbers();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedStudentList();
      // this.generatePageNumbers();
    }
  }

  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  // StudentList:any=[]; 

  ModalTitle:string | undefined;
  ActivateStudentEditComponent:boolean | undefined;
  stu:any;

  ngOnInit(): void {
    this.refreshStudentList();
    // this.studentList();
  }

      //pagination code
  // studentList() {
  //    this.service.getStudentList().subscribe((data:any)=>{
  //     this.StudentList=data;
  //       console.log( this.StudentList);
  //   });
  // }
  // // studentList(): Observable<any[]> {
  // //   return this.service.getStudentList().pipe(
  // //     tap((data: any[]) => {
  // //       this.StudentList = data;
  // //       console.log(this.StudentList);
  // //     })
  // //   );
  // // }
  
  // onTableDataChange(event:any) {
  //   this.page=event;
  //   this.StudentList();

  // }
  // onTableSizeChange(event:any):void{
  //   this.tableSize=event.target.value;
  //   this.page=1;
  //   this.StudentList();
  // }
  

  addClick(): void{
     this.stu={
      id:0,
      stname:"",
      course:""
     }
     this.ModalTitle="Add Student";
     this.ActivateStudentEditComponent=true;
  }
  editClick(item:any){
    this.stu=item;
    this.ModalTitle="Edit Student";
    this.ActivateStudentEditComponent=true;

  }
  deleteClick(item:any){
      if(confirm("Are you sure??")){
       this.service.deleteStudent(item.id).subscribe(data=>{
        alert(data.toString());
        this.refreshStudentList();
       });
      }
  }

  closeclick(){
    this.ActivateStudentEditComponent=false;
    this.refreshStudentList();
  }

    refreshStudentList(){
    this.service.getStudentList().subscribe((data:any)=>{
      this.StudentList=data;
      this.totalPages = Math.ceil(this.StudentList.length / this.itemsPerPage);
      this.generatePageNumbers();
      this.updateDisplayedStudentList();
    });
  }

}



