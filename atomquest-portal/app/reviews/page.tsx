import { AppShell } from "@/components/dashboard/app-shell"
import { TeamReviewsPanel } from "@/components/reviews/team-reviews-panel"

export default function ReviewsPage() {
  return (
    <AppShell
      title="Team Reviews"
      description="Direct reports, check-in status, and goal completion overview"
    >
      <TeamReviewsPanel />
    </AppShell>
  )
}
