const today = new Date();

const thisYear = today.getFullYear();

const footer = document.querySelector('footer');

const copyright = document.createElement('p');

copyright.innerHTML = `\u00A9 Elaine Martinez ${thisYear}`;

footer.appendChild(copyright);


const skills =[ "JavaScript", "HTML", "CSS", "GitHub"];

const skillsSection = document.getElementById('skills');

const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');

    skill.innerText = skills[i];

    skillsList.appendChild(skill);
}




const messageForm = document.forms['leave_message'];

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log('Name:', usersName);
    console.log('Email:', usersEmail);
    console.log('Message:', usersMessage);


    const messageSection = document.querySelector('#messages');

    const messageList = messageSection.querySelector('ul');

    const newMessage = document.createElement('li');
    
    newMessage.innerHTML= `
    <a href="mailto:${usersEmail}">${usersName}</a>
    <span>: ${usersMessage}</span>
    `;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';

    removeButton.addEventListener('click', function() {
        const entry = removeButton.parentNode;
        entry.remove();
    });

    newMessage.appendChild(removeButton);

    messageList.appendChild(newMessage);

    messageForm.reset();
});

const GITHUB_USERNAME = "elainefmartinez";

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
    .then(response => {
        return response.json();
    })
    .then(repositories => {
        console.log(repositories);

        const projectsSection = document.getElementById('projects');
        const projectsList = projectsSection.querySelector('ul');

        for (let i =0; i < repositories.length; i++) {
            const project = document.createElement('li');
            project.innerHTML = repositories[i].name;
            projectsList.appendChild(project);
        }
    })
    .catch(error => {
        console.error('Error fetching repos:', error);

    
        const projectsSection = document.getElementById('projects');
        projectsSection.innerHTML += `<p> Sorry, could not load. Try again</p>`;
    });
    