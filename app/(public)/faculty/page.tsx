import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FacultyDirectory() {
  const facultyMembers = [
    {
      id: "f1",
      name: "Dr. Maria Clara Recto, PE",
      designation: "Department Chair & Professor",
      email: "mcrecto@youruniversity.edu.ph",
      specialization: "Embedded Systems & Robotics",
      consultation: "Mon/Wed 1:00 PM - 3:00 PM",
    },
    {
      id: "f2",
      name: "Prof. Juanito Dela Cruz, M.Sc.",
      designation: "ICpEP Faculty Adviser & Instructor",
      email: "jdelacruz@youruniversity.edu.ph",
      specialization: "Cloud Computing & Advanced Networking",
      consultation: "Tue/Thu 9:00 AM - 11:30 AM",
    },
    {
      id: "f3",
      name: "Engr. Antonio Luna, B.Sc.",
      designation: "Laboratory Supervisor & Lecturer",
      email: "aluna@youruniversity.edu.ph",
      specialization: "Microprocessor Architectures & IoT Platforms",
      consultation: "Friday 2:00 PM - 5:00 PM",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto mb-12 text-center md:text-left border-b border-slate-200 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-university-maroon tracking-tight">
          Faculty & Roster Directory
        </h1>
        <p className="text-slate-500 mt-2 text-base md:text-lg max-w-2xl font-light">
          Connect with the professors, researchers, and engineers driving our Computer Engineering academic tracks.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyMembers.map((professor) => (
          <Card 
            key={professor.id} 
            className="rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-university-gold/40 transition-all duration-200 group hover:shadow-md cursor-pointer"
          >
            <div className="h-2 bg-university-maroon group-hover:bg-university-gold transition-colors duration-200" />
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-university-maroon transition-colors">
                {professor.name}
              </CardTitle>
              <CardDescription className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {professor.designation}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 pb-6">
              <div className="mb-6">
                <Badge variant="outline" className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-md border-slate-200/60 pointer-events-none">
                  🔬 {professor.specialization}
                </Badge>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4 mt-auto">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium w-4">📧</span>
                  <a href={`mailto:${professor.email}`} className="hover:text-org-blue hover:underline font-mono">
                    {professor.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/40">
                  <span className="text-slate-400 mt-0.5">🗓️</span>
                  <div>
                    <span className="font-semibold text-slate-700 block text-[10px] uppercase tracking-wider">Consultation Hours</span>
                    <span className="text-slate-500 font-light text-[11px]">{professor.consultation}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}