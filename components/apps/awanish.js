import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutAwanish extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "books": <Books />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        if (process.env.NEXT_PUBLIC_TRACKING_ID) {
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });
        }


        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about awanish" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="awanish education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="awanish skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="awanish projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="books" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "books" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="awanish books" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Books</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="awanish resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutAwanish;

export const displayAboutAwanish = () => {
    return <AboutAwanish />;
}


function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full rounded-full" src="https://avatars.githubusercontent.com/u/65104100?s=400&u=4c378155a52d7cc3eedf544d4de56e4d3f4c67f5&v=4" alt="Awanish Maurya" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>My name is <span className="font-bold">Awanish Maurya</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Cybersecurity Student!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className=" font-medium">B.Tech Student</span> currently pursuing Cyber Security and Forensics at <u className=' cursor-pointer '> <a href="https://niet.co.in" target={"_blank"}>NIET</a> </u>. I'm passionate about building practical cybersecurity tools and solving real-world problems! ( Hit me up <a className='text-underline' href='mailto:awanishmaurya9192@gmail.com'><u>@awanishmaurya9192@gmail.com</u></a> :) )</li>
                <li className=" mt-3 list-building"> I've developed <span className="font-medium">NIET Attendance Tracker</span> - a Python-based tool for tracking and analyzing attendance data with secure credential management, automated login via Selenium, and comprehensive attendance analysis features.</li>
                <li className=" mt-3 list-time"> I also created <span className="font-medium">MAC Speed Scanner</span> - a Linux utility that tests internet performance across different MAC addresses, helping optimize network performance and identify the best connection speeds.</li>
                <li className=" mt-3 list-star"> When I'm not coding, I enjoy exploring Linux systems, learning about network security, and contributing to open-source projects that make cybersecurity more accessible!</li>
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Noida Institute of Engineering and Technology (NIET)
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2024 - 2028</div>
                    <div className=" text-sm md:text-base">B.Tech in Cyber Security and Forensics</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Currently Enrolled</div>
                </li>
                <li className="list-disc">
                    <div className=" text-lg md:text-xl mt-4 text-left font-bold leading-tight">
                        Sunbeam Lahartara
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2022 - 2023</div>
                    <div className=" text-sm md:text-base">Secondary School Certificate (SSC)</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Percentage &nbsp; 73.2%</div>
                </li>
            </ul>
        </>
    )
}
function Skills() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    I've worked with a wide variety of programming languages & cybersecurity tools.
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div> My areas of expertise are <strong className="text-ubt-gedit-orange">cybersecurity, ethical hacking & Linux systems!</strong></div>
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>Here are my most frequently used</div>
                </li>
            </ul>
            <div className="w-full md:w-10/12 flex mt-4">
                <div className=" text-sm text-center md:text-base w-1/2 font-bold">Languages & Tools</div>
                <div className=" text-sm text-center md:text-base w-1/2 font-bold">Security & Systems</div>
            </div>
            <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
                <div className="px-2 w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="http://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="awanish python" />
                        <img className="m-1" src="https://img.shields.io/badge/C-00599C?style=flat&logo=c&logoColor=white" alt="awanish c" />
                        <a href="https://www.google.com/search?q=is+html+a+language%3F" target="_blank" rel="noreferrer"><img title="yes it's a language!" className="m-1" src="https://img.shields.io/badge/-HTML5-%23E44D27?style=flat&logo=html5&logoColor=ffffff" alt="awanish HTML" /></a>
                        <img className="m-1" src="https://img.shields.io/badge/-CSS3-%231572B6?style=flat&logo=css3&logoColor=ffffff" alt="awanish CSS" />
                        <img src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff" alt="awanish git" className="m-1" />
                        <img src="https://img.shields.io/badge/-Selenium-43B02A?style=flat&logo=selenium&logoColor=ffffff" alt="awanish selenium" className="m-1" />
                    </div>
                </div>
                <div className="px-2 flex flex-wrap items-start w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className=" m-1" src="https://img.shields.io/badge/-Kali_Linux-557C94?style=flat&logo=kalilinux&logoColor=white" alt="awanish kali" />
                        <img className=" m-1" src="https://img.shields.io/badge/-Red_Hat-EE0000?style=flat&logo=redhat&logoColor=white" alt="awanish redhat" />
                        <img className="m-1" src="https://img.shields.io/badge/-Cybersecurity-FF6B6B?style=flat&logo=security&logoColor=white" alt="awanish cybersecurity" />
                        <img className="m-1" src="https://img.shields.io/badge/-VirtualBox-183A61?style=flat&logo=virtualbox&logoColor=white" alt="awanish virtualbox" />
                        <img src="https://img.shields.io/badge/-VMware-607078?style=flat&logo=vmware&logoColor=white" alt="awanish vmware" className="m-1" />
                        <img src="https://img.shields.io/badge/-CLI-000000?style=flat&logo=terminal&logoColor=white" alt="awanish cli" className="m-1" />
                    </div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <span> And of course,</span> <img className=" inline ml-1" src="http://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff" alt="awanish linux" /> <span>!</span>
                </li>
            </ul>
        </>
    )
}

function Projects() {
    const project_list = [
        {
            name: "NIET Attendance Tracker",
            date: "2024",
            link: "https://github.com/iamawanishmaurya/NIET-Attendance-Tracker",
            description: [
                "A Python-based tool for tracking and analyzing attendance data from the NIET student portal. Features secure credential management, automated login via Selenium, and attendance analysis with projections.",
            ],
            domains: ["python", "selenium", "rich", "cryptography"]
        },
        {
            name: "MAC Speed Scanner",
            date: "2024",
            link: "https://github.com/iamawanishmaurya/Mac-Speed-Scanner",
            description: [
                "A Linux utility that tests internet performance across different MAC addresses on your network interface. Helps identify which MAC address provides the best internet speeds for network optimization.",
            ],
            domains: ["python", "linux", "networking", "speedtest"]
        },
        {
            name: "Contributor Hub",
            date: "2024",
            link: "https://github.com/iamawanishmaurya/Contributor-Hub",
            description: [
                "A welcoming repository to help beginners make their first open-source contribution by adding their favorite quote to quotes.md.",
            ],
            domains: ["open-source", "community", "github"]
        },
        {
            name: "NIET Attendance Report",
            date: "2024",
            link: "https://github.com/iamawanishmaurya/Niet-Attendance-Report",
            description: [
                "A web app to view NIET Cloud attendance reports with a beautiful interface for students to track their academic progress.",
            ],
            domains: ["html", "css", "javascript", "web-app"]
        }
    ];

    const tag_colors = {
        "python": "green-200",
        "selenium": "green-400",
        "rich": "blue-400",
        "cryptography": "purple-400",
        "linux": "orange-400",
        "networking": "blue-500",
        "speedtest": "yellow-400",
        "open-source": "green-500",
        "community": "purple-500",
        "github": "gray-400",
        "html": "pink-600",
        "css": "blue-300",
        "javascript": "yellow-300",
        "web-app": "indigo-400"
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                        <iframe src={`https://ghbtns.com/github-btn.html?user=iamawanishmaurya&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full`}>{domain}</span>
                                            })

                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}

function Books() {
    const book_list = [
        {
            title: "Crime and Punishment",
            author: "Fyodor Dostoevsky",
            genre: "Psychological Fiction",
            description: "A profound exploration of guilt, redemption, and the human psyche through the story of Raskolnikov.",
            cover: "./images/books/Crime and Punishment.jpg"
        },
        {
            title: "The Metamorphosis",
            author: "Franz Kafka",
            genre: "Absurdist Fiction",
            description: "A surreal tale about Gregor Samsa who wakes up transformed into a giant insect.",
            cover: "./images/books/The Metamorphosis.jpg"
        },
        {
            title: "The Bell Jar",
            author: "Sylvia Plath",
            genre: "Autobiographical Fiction",
            description: "A semi-autobiographical novel exploring mental illness and the pressures of society.",
            cover: "./images/books/The Bell Jar.jpg"
        },
        {
            title: "The Stranger",
            author: "Albert Camus",
            genre: "Existentialist Fiction",
            description: "An exploration of absurdism and existentialism through the story of Meursault.",
            cover: "./images/books/The Stranger.jpg"
        },
        {
            title: "The Blind Owl",
            author: "Sadegh Hedayat",
            genre: "Surrealist Fiction",
            description: "A haunting Persian novel exploring themes of death, madness, and existential dread.",
            cover: "./images/books/The Blind Owl.jpg"
        },
        {
            title: "Mrs. Dalloway",
            author: "Virginia Woolf",
            genre: "Modernist Fiction",
            description: "A stream-of-consciousness novel following a day in the life of Clarissa Dalloway.",
            cover: "./images/books/Mrs._Dalloway_cover.jpg"
        },
        {
            title: "War and Peace",
            author: "Leo Tolstoy",
            genre: "Historical Fiction",
            description: "An epic novel set during Napoleon's invasion of Russia, exploring themes of war, love, and fate.",
            cover: "./images/books/war-and-peace-9781627936644_hr.jpg"
        },
        {
            title: "Nineteen Eighty-Four",
            author: "George Orwell",
            genre: "Dystopian Fiction",
            description: "A chilling vision of totalitarianism and surveillance in a dystopian future.",
            cover: "./images/books/1984.jpg"
        },
        {
            title: "The Picture of Dorian Gray",
            author: "Oscar Wilde",
            genre: "Gothic Fiction",
            description: "A philosophical novel about beauty, morality, and the consequences of vanity.",
            cover: "./images/books/the-picture-of-dorian-gray-9781476788128_lg.jpg"
        }
    ];

    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full rounded-full" src="https://avatars.githubusercontent.com/u/65104100?s=400&u=4c378155a52d7cc3eedf544d4de56e4d3f4c67f5&v=4" alt="Awanish Maurya" />
            </div>
            <div className="mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>My name is <span className="font-bold">Awanish Maurya</span>,</div>
                <div className="font-normal ml-1">and I'm a <span className="text-pink-600 font-bold">Book Lover!</span></div>
            </div>
            <div className="mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <div className="mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4">
                <p className="mb-4 text-gray-300">
                    Here are some of my favorite books that have shaped my thinking and worldview. 
                    I believe reading is essential for personal growth and understanding different perspectives.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {book_list.map((book, index) => (
                        <div key={index} className="bg-ub-grey bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-all duration-200 flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0">
                                <img 
                                    src={book.cover} 
                                    alt={`${book.title} cover`}
                                    className="w-32 h-48 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">{book.title}</h3>
                                <p className="text-ubt-blue font-medium mb-1">by {book.author}</p>
                                <p className="text-gray-400 text-sm mb-2 italic">{book.genre}</p>
                                <p className="text-gray-300 text-sm">{book.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/Awanish-Maurya-Resume.pdf" title="Awanish Maurya Resume" frameBorder="0"></iframe>
    )
}