export interface TeamMember {
  id: string
  name: string
  department: string
  role: string
  goalsCount: number
  completionRate: number
  pendingApprovals: number
  checkinStatus: "complete" | "pending" | "overdue"
  manager: string
}

export interface EscalationItem {
  id: string
  type: "submission" | "approval" | "checkin"
  employee: string
  department: string
  description: string
  daysOverdue: number
  severity: "high" | "medium" | "low"
}

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Ruchita Parmar",
    department: "Sales",
    role: "Account Executive",
    goalsCount: 6,
    completionRate: 85,
    pendingApprovals: 0,
    checkinStatus: "complete",
    manager: "Kalpana Gohil",
  },
  {
    id: "tm2",
    name: "Dilipkumar Kalsariya",
    department: "Engineering",
    role: "Senior Engineer",
    goalsCount: 5,
    completionRate: 45,
    pendingApprovals: 2,
    checkinStatus: "pending",
    manager: "Kalpana Gohil",
  },
  {
    id: "tm3",
    name: "Prachi Shukla",
    department: "Customer Success",
    role: "CS Manager",
    goalsCount: 4,
    completionRate: 72,
    pendingApprovals: 0,
    checkinStatus: "complete",
    manager: "Kalpana Gohil",
  },
  {
    id: "tm4",
    name: "Bobby Prashant",
    department: "IT",
    role: "Infrastructure Lead",
    goalsCount: 5,
    completionRate: 58,
    pendingApprovals: 1,
    checkinStatus: "overdue",
    manager: "Kalpana Gohil",
  },
  {
    id: "tm5",
    name: "Harshitha Chaudhary",
    department: "HR",
    role: "Talent Partner",
    goalsCount: 4,
    completionRate: 30,
    pendingApprovals: 0,
    checkinStatus: "pending",
    manager: "Kalpana Gohil",
  },
]

export const escalations: EscalationItem[] = [
  {
    id: "e1",
    type: "checkin",
    employee: "Bobby Prashant",
    department: "IT",
    description: "Q2 quarterly check-in not submitted",
    daysOverdue: 4,
    severity: "high",
  },
  {
    id: "e2",
    type: "approval",
    employee: "Dilipkumar Kalsariya",
    department: "Engineering",
    description: "Goal approval pending since 6 days",
    daysOverdue: 6,
    severity: "high",
  },
  {
    id: "e3",
    type: "submission",
    employee: "Manisha Gohil",
    department: "Support",
    description: "FY26 goals not submitted",
    daysOverdue: 12,
    severity: "medium",
  },
  {
    id: "e4",
    type: "checkin",
    employee: "Harshitha Chaudhary",
    department: "HR",
    description: "Q2 check-in draft incomplete",
    daysOverdue: 2,
    severity: "low",
  },
]

export const sharedGoals = [
  {
    id: "sg1",
    title: "Organization NPS ≥ 65",
    owner: "Prachi Shukla",
    department: "Customer Success",
    recipients: 12,
    synced: true,
  },
  {
    id: "sg2",
    title: "Zero critical security incidents",
    owner: "Nishant Singh",
    department: "Security",
    recipients: 8,
    synced: true,
  },
]

export const performanceCycles = [
  { id: "fy26-q1", label: "FY26 Q1", status: "closed" as const },
  { id: "fy26-q2", label: "FY26 Q2", status: "active" as const },
  { id: "fy26-q3", label: "FY26 Q3", status: "upcoming" as const },
]
