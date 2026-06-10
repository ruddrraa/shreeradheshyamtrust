interface AdminHeaderProps {
  title: string;
  description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="font-heading text-3xl text-charcoal font-light">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-charcoal/50 text-sm">{description}</p>
      )}
    </div>
  );
}
