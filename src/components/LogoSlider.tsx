"use client";

// Demo company logos - using placeholder URLs for testing
const logos = [
  { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" },
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" },
  { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png" },
  { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png" },
  { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png" },
  { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png" },
  { name: "Spotify", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/512px-Spotify_logo_without_text.svg.png" },
  { name: "Adobe", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.svg/512px-Adobe_Corporate_Logo.svg.png" },
];

const logos2 = [
  { name: "Intel", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/512px-Intel_logo_%282006-2020%29.svg.png" },
  { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/512px-IBM_logo.svg.png" },
  { name: "Samsung", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/512px-Samsung_Logo.svg.png" },
  { name: "Tesla", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png" },
  { name: "Nvidia", url: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/512px-Nvidia_logo.svg.png" },
  { name: "Oracle", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png" },
  { name: "Cisco", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/512px-Cisco_logo_blue_2016.svg.png" },
  { name: "Salesforce", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png" },
];

export default function LogoSlider() {
  return (
    <section className="py-16 bg-velox-black overflow-hidden" suppressHydrationWarning>
      {/* Glass Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-cyan-electric/10 text-cyan-electric text-sm font-medium rounded-full mb-4">
            Trusted Partners
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Companies We&apos;ve <span className="text-cyan-electric">Worked With</span>
          </h2>
        </div>
      </div>

      {/* Glass Card Container */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative rounded-2xl border border-velox-gray-700/50 bg-velox-gray-900/30 backdrop-blur-xl p-8 overflow-hidden">
          {/* Gradient overlay on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-velox-gray-900/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-velox-gray-900/80 to-transparent z-10 pointer-events-none" />

          {/* First Row - Moves Right to Left */}
          <div className="relative mb-8 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee-left" suppressHydrationWarning>
              {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 mx-8 w-28 h-14 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="object-contain max-h-10 max-w-[100px] invert"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Moves Left to Right */}
          <div className="relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee-right" suppressHydrationWarning>
              {[...logos2, ...logos2, ...logos2, ...logos2].map((logo, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 mx-8 w-28 h-14 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="object-contain max-h-10 max-w-[100px] invert"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-electric/5 via-transparent to-cyan-electric/5 pointer-events-none" />
        </div>
      </div>

      {/* CSS for marquee animations */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
