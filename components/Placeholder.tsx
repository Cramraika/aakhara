// Placeholder for Aakhara components.
// When voice-roleplay surface lands, add <ArenaHero />, <RoleplaySession />, etc.
export function Placeholder({ label }: { label: string }) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
      <p className="text-xs uppercase tracking-[0.1em] text-primary">{label}</p>
    </div>
  );
}
