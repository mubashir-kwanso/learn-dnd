import { Button } from "@/components/shadcn/button";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4 text-center space-y-4">
      <h1 className="text-4xl font-bold">Learn DND</h1>
      <p>Learn DND is a project to learn drag and drop!</p>
      <Button variant={"default"}>Click me</Button>
    </main>
  );
}
