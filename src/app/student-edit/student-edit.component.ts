import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  @Input() stu: any;
  id!: number;
  stname!: string;
  course!: string;
  Student: any;
  StudentList: any;

  // stu: any = {}; 

  constructor(private service: StudentService, private router:ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this.id = this.stu.id;
    this.stname = this.stu.stname;
    this.course = this.stu.course;

    this.StudentList = this.stu.group({
      stname: ['', Validators.required],
      course: ['', Validators.required],

    }); 
    
  }

  addStudent(){
    var val = {id:this.stu.id,
            stname:this.stu.stname,
            course:this.stu.course };  
     this.service.addStudent(val).subscribe(res=>{
              alert(res.toString());
     });  
     location.reload(); 
  }
  // Assuming you have the `stu` object initialized with the student data
  updateStudent() {
    const url = 'https://localhost:7032/api/Student/UpdateStudent/${this.stu.id}'; 
    // Create an object with the updated student data 
    const updatedStudent = { id: this.stu.id, stname: this.stu.stname, course: this.stu.course };
     this.http.put(url, updatedStudent) .subscribe( (response) => { 
       // Handle the success response here 
       alert('Student updated successfully');
       console.log('Student updated successfully:', response); 
     }, 
       (error) => { 
         // Handle the error response here 
         console.error('Error updating student:', error); 
       } ); 
       location.reload(); 
    }
  }




  // this.studentForm = new FormGroup({
    //   stname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    //   course: new FormControl('', [Validators.required])
    // });

  // updateStudent(){
  //   var val = {
  //      id:this.id,
  //     stname:this.stname, 
  //     course:this.course };  
  //   //  this.service.updateStudent(this.id,val).subscribe(res=>{
  //   //       alert(res.toString());
  //          this.service.updateStudent(this.id,val).subscribe(
  //       res => {
  //         alert('Student updated successfully');
  //       });
  //     }
  
        //console.log('Student updated successfully');
     
     
      //  updateStudent() {
      //   const val = {
      //     id: this.stu.id,
      //     stname: this.stu.stname,
      //     course: this.stu.course
      //   };     
     
     
      //   this.service.updateStudent(this.stu.id,this.stu).subscribe(
      //     res => {
      //       alert('Student updated successfully');
           
      //     },
      //     error => {
      //       alert('An error occurred while updating the student: ' + error.message);
            
      //     }
      //   ); }


     


        //  submitForm() {
        //   if (this.studentForm.valid) {
        //     // Form is valid, perform form submission or any other required actions
        //     console.log('Form submitted successfully.');
        //     console.log('Student Name:', this.studentForm.value.stname);
        //     console.log('Student Course:', this.studentForm.value.course);
      
        //     // You can also reset the form after successful submission if needed
        //     this.studentForm.reset();
        //   } else {
        //     // Form is invalid, display error messages and prevent submission
        //     console.log('Form is invalid. Please fix the errors.');
        //     this.markFormGroupTouched(this.studentForm);
        //   }
        // }
        // markFormGroupTouched(formGroup: FormGroup) {
        //   Object.values(formGroup.controls).forEach(control => {
        //     control.markAsTouched();
        //     if (control instanceof FormGroup) {
        //       this.markFormGroupTouched(control);
        //     }
        //   });
        // }
    
 


  

