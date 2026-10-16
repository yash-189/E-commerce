import { Container, EmptyState } from "../ui/States";

export default function NotFound({ what = "page" }) {
  return (
    <Container>
      <EmptyState
        title={`We couldn't find that ${what}`}
        body="The link may be broken, or it may have been removed."
        action="Go to the shop"
      >
        <p className="text-5xl font-bold text-indigo-500">404</p>
      </EmptyState>
    </Container>
  );
}
