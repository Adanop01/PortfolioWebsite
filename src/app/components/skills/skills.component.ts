import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  frontendSkills = [
    { name: 'Angular', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'HTML5/CSS3', level: 90 },
    { name: 'Bootstrap', level: 85 },
    { name: 'jQuery', level: 80 },
    { name: 'Blazor', level: 75 }
  ];

  backendSkills = [
    { name: '.NET Core', level: 95 },
    { name: 'ASP.NET MVC', level: 90 },
    { name: 'Web API', level: 90 },
    { name: 'C#', level: 95 },
    { name: 'Dapper', level: 80 }
  ];

  databaseSkills = [
    { name: 'SQL Server', level: 90 },
    { name: 'MySQL', level: 85 },
    { name: 'Oracle', level: 80 },
    { name: 'Entity Framework', level: 85 }
  ];

  devopsSkills = [
    { name: 'Azure', level: 75 },
    { name: 'Git', level: 85 },
    { name: 'IIS', level: 80 },
    { name: 'CI/CD', level: 70 },
    { name: 'Visual Studio', level: 90 },
    { name: 'SSMS', level: 85 }
  ];

  additionalSkills = [
    'SDLC', 'Agile', 'Microservices', 'SFTP', 'File Stream Reader',
    'System Design', 'REST APIs', 'JSON', 'XML', 'Unit Testing'
  ];
}
