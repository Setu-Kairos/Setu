// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EduChainUnified {
    struct Student {
        string name;
        string gender;
        string email;
        string phone;
        string className; 
        string school;
        string city;
        string state;
        string dob;
    }

    struct Resource {
        string resourceHash;
        string resourceType;
        address uploadedBy;
    }

    mapping(address => Student) public students;
    mapping(string => Resource) public resources;
    mapping(address => uint) public progress;

    event StudentCreated(address indexed student, string name);
    event ResourceUploaded(string indexed resourceHash, address indexed uploader);
    event ProgressRecorded(address indexed student, uint progressScore);

modifier onlyStudent(address student) {
    require(bytes(students[student].email).length > 0, "Student does not exist");
    _;
}


    function createStudentID(
        address student,
        string memory name,
        string memory gender,
        string memory email,
        string memory phone,
        string memory className, 
        string memory school,
        string memory city,
        string memory state,
        string memory dob
    ) public {
        require(bytes(students[student].name).length == 0, "Student ID already exists");
        
        students[student] = Student(name, gender, email, phone, className, school, city, state, dob);
        
        emit StudentCreated(student, name);
    }

    function uploadResource(string memory resourceHash, string memory resourceType) public {
        require(bytes(resources[resourceHash].resourceHash).length == 0, "Resource already exists");
        
        resources[resourceHash] = Resource(resourceHash, resourceType, msg.sender);
        
        emit ResourceUploaded(resourceHash, msg.sender);
    }

    function recordProgress(address student, uint progressScore) public onlyStudent(student) {
        progress[student] = progressScore;
        
        emit ProgressRecorded(student, progressScore);
    }

}
