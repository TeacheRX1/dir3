// SahraCity Statistics Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Initialize counting animations for stat numbers
    initCountUp();
    
    // Initialize chart visualizations
    initPlayerActivityChart();
    initPlayerCountChart();
    initPeakHoursChart();
    
    // Add event listeners for time filter buttons
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            timeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart data based on selected timeframe
            updateChartTimeframe(this.getAttribute('data-timeframe'));
        });
    });
    
    // Custom cursor effect
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursor && cursorOutline) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }
    
    // Add scroll progress indicator
    window.addEventListener('scroll', updateScrollProgress);
    
    // Create floating particles for background effect
    createFloatingParticles();
});

// Function to create floating background particles
function createFloatingParticles() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.classList.add('floating-particle');
            
            // Random position
            const posX = Math.random() * section.offsetWidth;
            const posY = Math.random() * section.offsetHeight;
            
            // Random size
            const size = Math.random() * 6 + 2;
            
            // Random opacity
            const opacity = Math.random() * 0.15 + 0.05;
            
            // Animation properties
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Set styles
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            // Add to section
            section.appendChild(particle);
        }
    });
}

// Format large numbers with K and M suffixes
function formatLargeNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

// Function to animate counting up for statistics
function initCountUp() {
    const countElements = document.querySelectorAll('.count-up');
    const moneyElements = document.querySelectorAll('.money-count');
    
    countElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        animateValue(el, 0, target, 2000);
    });
    
    moneyElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        animateMoneyValue(el, 0, target, 2500);
    });
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        obj.innerHTML = currentValue.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function animateMoneyValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        // Format with M and K suffixes
        obj.innerHTML = '$' + formatLargeNumber(currentValue);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Function to update scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = progress + '%';
    }
}

// Chart initialization functions
function initPlayerActivityChart() {
    const dailyData = generateHourlyData(24);
    
    const options = {
        series: [{
            name: 'Players Online',
            data: dailyData
        }],
        chart: {
            height: 350,
            type: 'area',
            fontFamily: 'Poppins, sans-serif',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            background: 'transparent',
            foreColor: 'rgba(255, 255, 255, 0.7)'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#f5b642']
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#f5b642',
                        opacity: 0.4
                    },
                    {
                        offset: 100,
                        color: '#f5b642',
                        opacity: 0
                    }
                ]
            }
        },
        markers: {
            size: 4,
            colors: ['#f5b642'],
            strokeColors: '#282c38',
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        xaxis: {
            categories: generateTimeLabels(24),
            labels: {
                style: {
                    colors: 'rgba(255, 255, 255, 0.7)'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            min: 0,
            max: 180,
            labels: {
                style: {
                    colors: 'rgba(255, 255, 255, 0.7)'
                },
                formatter: function(val) {
                    return val.toFixed(0);
                }
            }
        },
        tooltip: {
            x: {
                format: 'HH:mm'
            },
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
            },
            marker: {
                show: true,
            },
            y: {
                formatter: function(val) {
                    return val + " players";
                }
            }
        },
        grid: {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            row: {
                colors: ['transparent', 'transparent']
            },
            column: {
                colors: ['transparent', 'transparent']
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 10
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: 'rgba(255, 255, 255, 0.7)'
            }
        }
    };

    const chart = new ApexCharts(document.querySelector('#player-activity-chart'), options);
    chart.render();
    
    // Store chart instance for later updates
    window.playerActivityChart = chart;
}

function initPlayerCountChart() {
    const monthlyData = generateDailyData(30);
    
    const options = {
        series: [{
            name: 'Average Players',
            data: monthlyData
        }],
        chart: {
            height: 350,
            type: 'bar',
            fontFamily: 'Poppins, sans-serif',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            background: 'transparent',
            foreColor: 'rgba(255, 255, 255, 0.7)'
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                columnWidth: '60%',
                distributed: false,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        colors: ['#f5b642'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: generateDateLabels(30),
            labels: {
                style: {
                    colors: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '12px'
                },
                rotate: -45,
                rotateAlways: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            min: 0,
            max: 180,
            labels: {
                style: {
                    colors: 'rgba(255, 255, 255, 0.7)'
                },
                formatter: function(val) {
                    return val.toFixed(0);
                }
            }
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
            },
            y: {
                formatter: function(val) {
                    return val + " players";
                }
            }
        },
        grid: {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            row: {
                colors: ['transparent', 'transparent']
            }
        }
    };

    const chart = new ApexCharts(document.querySelector('#player-count-chart'), options);
    chart.render();
}

function initPeakHoursChart() {
    const options = {
        series: [{
            name: 'Average Players',
            data: [20, 35, 42, 38, 30, 25, 18, 15, 23, 48, 67, 89, 105, 95, 87, 92, 110, 135, 158, 142, 125, 95, 65, 40]
        }],
        chart: {
            height: 350,
            type: 'radar',
            fontFamily: 'Poppins, sans-serif',
            toolbar: {
                show: false
            },
            background: 'transparent',
            foreColor: 'rgba(255, 255, 255, 0.7)'
        },
        colors: ['#f5b642'],
        stroke: {
            width: 2,
            colors: ['#f5b642']
        },
        fill: {
            opacity: 0.3,
            colors: ['#f5b642']
        },
        markers: {
            size: 3,
            colors: ['#f5b642'],
            strokeColors: '#282c38',
            strokeWidth: 2
        },
        xaxis: {
            categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
                         '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            labels: {
                style: {
                    colors: Array(24).fill('rgba(255, 255, 255, 0.7)'),
                    fontSize: '11px'
                }
            }
        },
        yaxis: {
            show: false
        },
        plotOptions: {
            radar: {
                polygons: {
                    strokeColors: 'rgba(255, 255, 255, 0.1)',
                    fill: {
                        colors: ['transparent']
                    }
                }
            }
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
            },
            y: {
                formatter: function(val) {
                    return val + " players";
                }
            }
        },
        grid: {
            show: false
        }
    };

    const chart = new ApexCharts(document.querySelector('#peak-hours-chart'), options);
    chart.render();
}

// Function to update chart data based on selected timeframe
function updateChartTimeframe(timeframe) {
    let data;
    let categories;
    
    switch(timeframe) {
        case 'day':
            data = generateHourlyData(24);
            categories = generateTimeLabels(24);
            break;
        case 'week':
            data = generateHourlyData(24 * 7);
            categories = generateWeekLabels();
            break;
        case 'month':
            data = generateDailyData(30);
            categories = generateDateLabels(30);
            break;
        default:
            data = generateHourlyData(24);
            categories = generateTimeLabels(24);
    }
    
    // Update player activity chart
    if (window.playerActivityChart) {
        window.playerActivityChart.updateOptions({
            series: [{
                name: 'Players Online',
                data: data
            }],
            xaxis: {
                categories: categories
            }
        });
    }
}

// Helper functions to generate realistic data for charts
function generateHourlyData(hours) {
    const data = [];
    let baseValue = Math.floor(Math.random() * 20) + 60; // start with a random value between 60-80
    
    // Define hour patterns for a typical Algerian server
    const hourPatterns = [
        45, 40, 35, 28, 25, 30, // 00:00 - 05:00 (late night, decreasing)
        35, 45, 60, 72, 80, 85, // 06:00 - 11:00 (morning, increasing)
        90, 85, 80, 85, 90, 95, // 12:00 - 17:00 (afternoon, steady)
        110, 130, 145, 140, 115, 80  // 18:00 - 23:00 (evening peak, then decline)
    ];
    
    for (let i = 0; i < hours; i++) {
        // Get hour of day (0-23)
        const timeOfDay = i % 24;
        
        // Base value from the pattern
        const patternValue = hourPatterns[timeOfDay];
        
        // Add some natural fluctuation (±15%)
        const fluctuation = patternValue * (Math.random() * 0.3 - 0.15);
        
        // Weekly pattern - weekends have more players
        const dayOfWeek = Math.floor(i / 24) % 7;
        const weekendBoost = (dayOfWeek === 5 || dayOfWeek === 6) ? 20 : 0; // Friday and Saturday boost
        
        // Calculate final value
        let value = patternValue + fluctuation + weekendBoost;
        
        // Ensure within bounds (5-180 players)
        value = Math.max(5, Math.min(180, Math.round(value)));
        
        data.push(value);
    }
    
    return data;
}

function generateDailyData(days) {
    const data = [];
    
    // Define day of week pattern (0 = Sunday, 6 = Saturday)
    const weekdayPattern = [85, 70, 75, 80, 85, 110, 120]; // Weekend peaks
    
    let currentDate = new Date();
    let startDate = new Date();
    startDate.setDate(currentDate.getDate() - (days - 1));
    
    for (let i = 0; i < days; i++) {
        let day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        
        // Get day of week (0-6)
        const dayOfWeek = day.getDay();
        
        // Base value from the pattern
        const baseValue = weekdayPattern[dayOfWeek];
        
        // Add some natural fluctuation (±15%)
        const fluctuation = baseValue * (Math.random() * 0.3 - 0.15);
        
        // Calculate final value
        let value = baseValue + fluctuation;
        
        // Add trend - slight overall increase or decrease
        const trendFactor = (i / days) * 10; // Slight upward trend
        value += trendFactor;
        
        // Ensure within bounds (30-180 players)
        value = Math.max(30, Math.min(180, Math.round(value)));
        
        data.push(value);
    }
    
    return data;
}

function generateTimeLabels(hours) {
    const labels = [];
    let currentDate = new Date();
    // Round to the nearest hour
    currentDate.setMinutes(0, 0, 0);
    
    // Go back to the start time
    currentDate.setHours(currentDate.getHours() - (hours - 1));
    
    for (let i = 0; i < hours; i++) {
        labels.push(formatTime(currentDate));
        currentDate.setHours(currentDate.getHours() + 1);
    }
    
    return labels;
}

function generateDateLabels(days) {
    const labels = [];
    let currentDate = new Date();
    
    // Go back to the start date
    currentDate.setDate(currentDate.getDate() - (days - 1));
    
    for (let i = 0; i < days; i++) {
        labels.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return labels;
}

function generateWeekLabels() {
    const labels = [];
    let currentDate = new Date();
    
    // Round to the nearest day and go back to start of current week (Sunday)
    currentDate.setHours(0, 0, 0, 0);
    const dayOfWeek = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - dayOfWeek);
    
    // Create label for each 4-hour block in the week
    for (let day = 0; day < 7; day++) {
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
        
        for (let hour = 0; hour < 24; hour += 4) {
            const hourFormatted = hour.toString().padStart(2, '0');
            labels.push(`${dayName} ${hourFormatted}:00`);
        }
    }
    
    return labels;
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    return `${hours}:00`;
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
    return `${day}/${month}`;
}