// "use client";

// export default function PromoBanner() {
//   return (
//     <section className="relative bg-gray-100 py-16 px-8 md:px-16 overflow-hidden">
//       {/* Vertical grid lines (matching hero) */}
//       {[18, 36, 54, 72].map((pos) => (
//         <div
//           key={pos}
//           className="absolute top-0 bottom-0 w-px bg-gray-300/40"
//           style={{ left: `${pos}%` }}
//         />
//       ))}

//       <div className="relative z-10 max-w-4xl mx-auto">
//         <div className="flex items-stretch bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
//           {/* Left image panel */}
//           <div
//             className="w-48 md:w-64 flex-shrink-0 relative"
//             style={{
//               background: "linear-gradient(135deg, #d4ede4 0%, #c8e6d8 100%)",
//             }}
//           >
//             {/* Decorative floating rock / 3D object placeholder */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative">
//                 {/* Rock shape using CSS */}
//                 <div
//                   className="w-32 h-32 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] shadow-xl"
//                   style={{ transform: "rotate(-15deg)" }}
//                 />
//                 {/* Greenery on top */}
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
//                   <div className="w-3 h-5 bg-emerald-400 rounded-full" style={{ transform: "rotate(-10deg)" }} />
//                   <div className="w-2 h-7 bg-emerald-500 rounded-full" />
//                   <div className="w-3 h-4 bg-emerald-300 rounded-full" style={{ transform: "rotate(8deg)" }} />
//                 </div>
//                 {/* Small flower */}
//                 <div className="absolute -top-6 right-2 text-pink-300 text-lg">✿</div>
//               </div>
//             </div>
//           </div>

//           {/* Right content */}
//           <div className="flex flex-col justify-center px-8 py-8 gap-3">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//               20% off when hiring before{" "}
//               <span className="text-emerald-500">June 30</span>
//             </h2>
//             <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
//               The offer is valid for web design, development, and full-stack projects. Let&apos;s build something great together.
//             </p>
//             <div className="mt-2">
//               <a
//                 href="#contact"
//                 className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-6 py-3 rounded-full transition-colors"
//               >
//                 <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✦</span>
//                 Book a Discount
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
