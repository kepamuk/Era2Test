interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <div className="space-y-4">
    <h1 className="text-3xl md:text-4xl">{title}</h1>
    {description && <p className="text-muted-foreground">{description}</p>}
  </div>
);

export default PlaceholderPage;
