function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
}

Student.prototype.addMark = function (mark) {
  if (!this.hasOwnProperty('marks')){ 
      this.marks = [mark]; 
    } else {
      this.marks.push(mark);
    }
}

Student.prototype.addMarks = function (...marks) {
  i = 0;
  for (let mark of marks) {
    if (!this.hasOwnProperty('marks') && i === 0){ 
      this.marks = [mark]; 
    }
    else {
      this.marks.push(mark);
    }
    i++;
  }
}

Student.prototype.getAverage = function () {
  if (this.hasOwnProperty('marks')) {
    return this.marks.reduce((acc, item) => acc + item, 0) / this.marks.length;
  }
  else {
    return;
  }
}

Student.prototype.exclude = function (reason) {
  delete this.marks;
  delete this.subject;
  this.excluded = reason;
}