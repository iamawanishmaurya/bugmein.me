import React, { useState, useEffect } from 'react';

export default function SpaceX() {
    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchUpcomingLaunches();
    }, []);

    const fetchUpcomingLaunches = async () => {
        try {
            // Using SpaceX API v4 for upcoming launches
            const response = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
            const data = await response.json();
            
            // Filter out past launches and take first 5 upcoming launches
            const now = new Date();
            const upcomingLaunches = data
                .filter(launch => new Date(launch.date_utc) > now)
                .slice(0, 5)
                .map(launch => ({
                    id: launch.id,
                    name: launch.name,
                    date: new Date(launch.date_utc).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    }),
                    dateUtc: launch.date_utc, // Store original UTC date for countdown
                    details: launch.details || 'No details available',
                    flightNumber: launch.flight_number,
                    rocket: 'Falcon 9', // Default to Falcon 9 for now
                    launchpad: 'SLC-40', // Default launchpad
                    success: launch.success,
                    upcoming: launch.upcoming,
                    patch: launch.links?.patch?.small || 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png'
                }));

            // If no upcoming launches, use fallback data
            if (upcomingLaunches.length === 0) {
                throw new Error('No upcoming launches found');
            }

            setLaunches(upcomingLaunches);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching SpaceX launches:', error);
            // Fallback data if API fails - using future dates
            const futureDate1 = new Date();
            futureDate1.setDate(futureDate1.getDate() + 5); // 5 days from now
            const futureDate2 = new Date();
            futureDate2.setDate(futureDate2.getDate() + 10); // 10 days from now
            const futureDate3 = new Date();
            futureDate3.setDate(futureDate3.getDate() + 15); // 15 days from now
            const futureDate4 = new Date();
            futureDate4.setDate(futureDate4.getDate() + 20); // 20 days from now
            const futureDate5 = new Date();
            futureDate5.setDate(futureDate5.getDate() + 25); // 25 days from now
            
            setLaunches([
                {
                    id: 'fallback-1',
                    name: 'Starlink Mission',
                    date: futureDate1.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    }),
                    dateUtc: futureDate1.toISOString(),
                    details: 'A batch of Starlink satellites to provide global internet coverage',
                    flightNumber: 123,
                    rocket: 'Falcon 9',
                    launchpad: 'SLC-40',
                    success: null,
                    upcoming: true,
                    patch: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png'
                },
                {
                    id: 'fallback-2',
                    name: 'Crew Dragon Mission',
                    date: futureDate2.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    }),
                    dateUtc: futureDate2.toISOString(),
                    details: 'Crew Dragon mission to the International Space Station',
                    flightNumber: 124,
                    rocket: 'Falcon 9',
                    launchpad: 'LC-39A',
                    success: null,
                    upcoming: true,
                    patch: 'https://images2.imgbox.com/4c/df/9oF6Vh1b_o.png'
                },
                {
                    id: 'fallback-3',
                    name: 'Falcon Heavy Mission',
                    date: futureDate3.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    }),
                    dateUtc: futureDate3.toISOString(),
                    details: 'Falcon Heavy launch for commercial satellite deployment',
                    flightNumber: 125,
                    rocket: 'Falcon Heavy',
                    launchpad: 'LC-39A',
                    success: null,
                    upcoming: true,
                    patch: 'https://images2.imgbox.com/be/e7/iNqsqVYM_o.png'
                },
                {
                    id: 'fallback-4',
                    name: 'Starlink Mission',
                    date: futureDate4.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    }),
                    dateUtc: futureDate4.toISOString(),
                    details: 'Another batch of Starlink satellites for global coverage',
                    flightNumber: 126,
                    rocket: 'Falcon 9',
                    launchpad: 'SLC-4E',
                    success: null,
                    upcoming: true,
                    patch: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png'
                },
                {
                    id: 'fallback-5',
                    name: 'Starship Test Flight',
                    date: futureDate5.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    }),
                    dateUtc: futureDate5.toISOString(),
                    details: 'Starship test flight for Mars mission development',
                    flightNumber: 127,
                    rocket: 'Starship',
                    launchpad: 'Starbase',
                    success: null,
                    upcoming: true,
                    patch: 'https://images2.imgbox.com/53/4d/NeR1vYFk_o.png'
                }
            ]);
            setLoading(false);
        }
    };

    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const updateCountdown = (launchDateUtc) => {
        const now = new Date();
        const launch = new Date(launchDateUtc);
        
        // Check if date is valid
        if (isNaN(launch.getTime())) {
            console.error('Invalid launch date:', launchDateUtc);
            setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }
        
        const diff = launch - now;
        
        if (diff <= 0) {
            setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
    };

    useEffect(() => {
        if (launches.length > 0) {
            const interval = setInterval(() => {
                updateCountdown(launches[0].dateUtc);
            }, 1000);
            
            return () => clearInterval(interval);
        }
    }, [launches]);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="h-full w-full bg-ub-cool-grey flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white">Loading SpaceX Data...</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-full w-full bg-ub-cool-grey flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white">Fetching Launch Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-black text-white overflow-y-auto">
            {/* Hero Section with Countdown */}
            {launches.length > 0 && (
                <div className="relative min-h-screen flex items-end pb-20">
                    {/* Background Image Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 w-full px-6">
                        <div className="max-w-4xl">
                            {/* Countdown */}
                            <div className="mb-8">
                                <div className="text-white text-5xl font-bold mb-6 font-mono flex items-center justify-center space-x-2">
                                    <span>T-</span>
                                    <div className="bg-black bg-opacity-80 px-4 py-3 rounded-lg min-w-[4rem] text-center border border-gray-600">
                                        <div className="text-5xl font-bold">{countdown.days.toString().padStart(2, '0')}</div>
                                        <div className="text-sm text-gray-400 uppercase tracking-wider">DAYS</div>
                                    </div>
                                    <span>:</span>
                                    <div className="bg-black bg-opacity-80 px-4 py-3 rounded-lg min-w-[4rem] text-center border border-gray-600">
                                        <div className="text-5xl font-bold">{countdown.hours.toString().padStart(2, '0')}</div>
                                        <div className="text-sm text-gray-400 uppercase tracking-wider">HRS</div>
                                    </div>
                                    <span>:</span>
                                    <div className="bg-black bg-opacity-80 px-4 py-3 rounded-lg min-w-[4rem] text-center border border-gray-600">
                                        <div className="text-5xl font-bold">{countdown.minutes.toString().padStart(2, '0')}</div>
                                        <div className="text-sm text-gray-400 uppercase tracking-wider">MIN</div>
                                    </div>
                                    <span>:</span>
                                    <div className="bg-black bg-opacity-80 px-4 py-3 rounded-lg min-w-[4rem] text-center border border-gray-600">
                                        <div className="text-5xl font-bold">{countdown.seconds.toString().padStart(2, '0')}</div>
                                        <div className="text-sm text-gray-400 uppercase tracking-wider">SEC</div>
                                    </div>
                                </div>
                                <h1 className="text-6xl font-bold text-white mb-4">{launches[0].name}</h1>
                                <p className="text-gray-300 text-lg">{launches[0].date}</p>
                            </div>
                            
                            {/* Watch Button */}
                            <button className="bg-white text-black px-8 py-4 rounded font-semibold hover:bg-gray-200 transition-colors">
                                WATCH
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Upcoming Launches Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8">Upcoming Launches</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-600">
                                        <th className="text-left py-4 px-2 text-sm font-normal text-gray-400 uppercase tracking-wider">Mission</th>
                                        <th className="text-left py-4 px-2 text-sm font-normal text-gray-400 uppercase tracking-wider">Vehicle</th>
                                        <th className="text-left py-4 px-2 text-sm font-normal text-gray-400 uppercase tracking-wider">Launch Site</th>
                                        <th className="text-left py-4 px-2 text-sm font-normal text-gray-400 uppercase tracking-wider">Launch Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {launches.map((launch, index) => (
                                        <tr key={launch.id} className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                                            <td className="py-4 px-2">
                                                <div className="flex items-center space-x-3">
                                                    <img 
                                                        src={launch.patch} 
                                                        alt={`${launch.name} patch`}
                                                        className="w-12 h-12 rounded object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png';
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="text-white font-medium">{launch.name}</p>
                                                        <p className="text-gray-400 text-sm">Flight #{launch.flightNumber}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 text-gray-300">{launch.rocket}</td>
                                            <td className="py-4 px-2 text-gray-300">{launch.launchpad}</td>
                                            <td className="py-4 px-2 text-gray-300">{launch.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SpaceX Stats */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8">About SpaceX</h2>
                        <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-4xl">
                            SpaceX designs, manufactures and launches advanced rockets and spacecraft. 
                            The company was founded in 2002 to revolutionize space technology, with the 
                            ultimate goal of enabling people to live on other planets.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">200+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">Launches</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">100+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">Landings</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">4000+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">Starlink Satellites</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">10+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">Crew Missions</div>
                            </div>
                        </div>
                    </div>

                    {/* Visit SpaceX Link */}
                    <div className="text-center">
                        <a 
                            href="https://www.spacex.com/launches" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-colors text-lg"
                        >
                            Visit SpaceX
                            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const displaySpaceX = () => {
    return <SpaceX />;
}
