import { AppShell } from "@/components/dashboard/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const topics = [
  {
    title: "Setting performance goals",
    body: "Employees can create up to 8 goals per cycle with a minimum 10% weight each. Total weight must not exceed 100%.",
  },
  {
    title: "Manager approvals",
    body: "Managers review submitted goals, adjust weightage if needed, and approve or reject with documented comments.",
  },
  {
    title: "Quarterly check-ins",
    body: "Submit planned targets and achievements each quarter. Progress is calculated automatically based on KPI type.",
  },
  {
    title: "Goal locking",
    body: "Approved goals are locked from employee edits. Admins can unlock goals for cycle corrections when required.",
  },
]

export default function HelpPage() {
  return (
    <AppShell
      title="Help & Support"
      description="Guides for AtomQuest performance management workflows"
    >
      <div className="grid max-w-3xl gap-4">
        {topics.map((topic) => (
          <Card key={topic.title}>
            <CardHeader>
              <CardTitle className="text-base">{topic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {topic.body}
              </p>
            </CardContent>
          </Card>
        ))}
        <p className="text-sm text-slate-500">
          Need more help? Contact{" "}
          <Link href="mailto:hr-support@atomquest.in" className="text-blue-600 hover:underline">
            hr-support@atomquest.in
          </Link>
        </p>
      </div>
    </AppShell>
  )
}
