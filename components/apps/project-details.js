import React from 'react';

export default function ProjectDetails() {
    return (
        <div className="h-full w-full bg-ub-cool-grey p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="bg-ub-grey rounded-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-white mb-4">📋 Project Details</h1>
                    <div className="w-full h-px bg-white mb-6"></div>
                    
                    <div className="space-y-6">
                        <div className="bg-ub-warm-grey bg-opacity-20 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-3">🔗 Original Project</h2>
                            <p className="text-gray-300 mb-3">
                                This portfolio is a fork of the amazing Ubuntu-themed portfolio created by Vivek Patel.
                            </p>
                            <div className="flex items-center space-x-4">
                                <a 
                                    href="https://vivek9patel.github.io/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <span>🌐</span>
                                    <span>Visit Original</span>
                                </a>
                                <a 
                                    href="https://github.com/vivek9patel/vivek9patel.github.io" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <span>📂</span>
                                    <span>View Source</span>
                                </a>
                            </div>
                        </div>

                        <div className="bg-ub-warm-grey bg-opacity-20 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-3">⚡ Customizations Made</h2>
                            <ul className="text-gray-300 space-y-2">
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Personalized with Awanish Maurya's information and projects</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Updated terminal with real project files and GitHub integration</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Added actual resume PDF display functionality</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Integrated real projects: NIET Attendance Tracker & MAC Speed Scanner</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Updated VSCode to show personal GitHub repository</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Enhanced terminal with git commands and project navigation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-ub-warm-grey bg-opacity-20 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-3">🛠️ Technologies Used</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div className="bg-ub-grey rounded p-3 text-center">
                                    <div className="text-blue-400 font-semibold">Next.js</div>
                                </div>
                                <div className="bg-ub-grey rounded p-3 text-center">
                                    <div className="text-blue-300 font-semibold">React</div>
                                </div>
                                <div className="bg-ub-grey rounded p-3 text-center">
                                    <div className="text-cyan-400 font-semibold">Tailwind CSS</div>
                                </div>
                                <div className="bg-ub-grey rounded p-3 text-center">
                                    <div className="text-yellow-400 font-semibold">JavaScript</div>
                                </div>
                                <div className="bg-ub-grey rounded p-3 text-center">
                                    <div className="text-orange-400 font-semibold">jQuery</div>
                                </div>
                                <div className="bg-ub-grey rounded p-3 text-center">
                                    <div className="text-green-400 font-semibold">GitHub Pages</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-ub-warm-grey bg-opacity-20 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-3">🙏 Credits & Acknowledgments</h2>
                            <p className="text-gray-300 mb-3">
                                Special thanks to <strong className="text-white">Vivek Patel</strong> for creating this amazing Ubuntu-themed portfolio template.
                            </p>
                            <p className="text-gray-300 mb-4">
                                The original project showcases incredible attention to detail in recreating the Ubuntu desktop experience in a web browser.
                            </p>
                            <div className="flex items-center space-x-4">
                                <a 
                                    href="https://github.com/vivek9patel" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline"
                                >
                                    👨‍💻 Vivek's GitHub
                                </a>
                                <a 
                                    href="https://www.linkedin.com/in/vivek9patel/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline"
                                >
                                    💼 Vivek's LinkedIn
                                </a>
                            </div>
                        </div>

                        <div className="bg-ub-warm-grey bg-opacity-20 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-3">⭐ Star the Original</h2>
                            <p className="text-gray-300 mb-4">
                                If you like this portfolio, please consider starring the original project to show your support!
                            </p>
                            <a 
                                href="https://github.com/vivek9patel/vivek9patel.github.io" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 w-fit"
                            >
                                <span>⭐</span>
                                <span>Star Original Project</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const displayProjectDetails = () => {
    return <ProjectDetails />;
}
