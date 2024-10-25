import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/shadcn/card";
import {
  Avatar,
  AvatarFallback,
} from "@/src/components/shadcn/avatar";
import { Button } from "@/src/components/shadcn/button";
import { Mail, Github, Linkedin, User } from "lucide-react";

const recentlyVisited = [
  { id: "AAPL", price: 150.25 },
  { id: "MSFT", price: 305.75 },
  { id: "AMZN", price: 3302.5 },
  { id: "GOOGL", price: 2750.0 },
  { id: "FB", price: 330.15 },
];

interface TeamMember {
  name: string;
  role: string;
  email: string;
  github: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Namn Namnsson",
    role: "Frontend Developer",
    email: "Namn@kth.se",
    github: "username",
    linkedin: "username",
  },
  {
    name: "Namn Namnsson",
    role: "Backend Developer",
    email: "erik@kth.se",
    github: "username",
    linkedin: "username",
  },
  {
    name: "Namn Namnsson",
    role: "Frontend Developer",
    email: "Namn@kth.se",
    github: "username",
    linkedin: "username",
  },
  {
    name: "Namn Namnsson",
    role: "Backend Developer",
    email: "Namn@kth.se",
    github: "username",
    linkedin: "username",
  },
];

const AboutUsView = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Welcome to FinanceTracker, a collaborative project developed by
                four passionate students from KTH Royal Institute of Technology.
                Our goal is to create an intuitive and powerful platform for
                tracking and analyzing financial data, providing users with
                valuable insights into market trends and investment
                opportunities.
              </p>
              <p className="mt-4">
                This project combines our diverse skills in frontend and backend
                development, UI/UX design, and data analysis to deliver a
                comprehensive solution for financial enthusiasts and
                professionals alike.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index:number) => (
              <Card key={'about-us' + index + member.name}>
                <CardContent className="flex items-center p-6">
                  <Avatar className="h-24 w-24 mr-6">
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-gray-500">{member.role}</p>
                    <div className="flex mt-2 space-x-2">
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutUsView;
