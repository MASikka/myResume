const fs = require('fs');
const path = require('path');

const pathToFile = path.join(path.dirname(require.main.filename), 'data', 'resume.json');

module.exports = class Resume {
    constructor(fullName,dateOfBirth,residence,occupation,introduction,image,phoneNumber,email,facebook,twitter,instagram
        ,school1,graduationDate1,school2,graduationDate2,school3,graduationDate3,technicalSkills,softSkills){
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.residence = residence;
        this.occupation = occupation;
        this.introduction = introduction;
        this.image = image;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.facebook = facebook;
        this.twitter = twitter;
        this.instagram = instagram;
        this.school1 = school1;
        this.graduationDate1 = graduationDate1;
        this.school2 = school2;
        this.graduationDate2 =graduationDate2;
        this.school3 = school3;
        this.graduationDate3 = graduationDate3;
        this.technicalSkills = technicalSkills;
        this.softSkills = softSkills;
    }

     saveResume(){
        fs.readFile(pathToFile, (error) =>{
            let resume = [];
            if(error){console.log(error);}

            resume.push(this);

            fs.writeFile(pathToFile, JSON.stringify(resume), (error) => {
                if(error){console.log('Error', error);
            }
            
            });
            
    })
    }

    static fetchResume(callBack){
        fs.readFile(pathToFile, (error, fileContent)=>{
            if(error){
                callBack([]);
            };

            callBack(JSON.parse(fileContent));
        });
    }

}