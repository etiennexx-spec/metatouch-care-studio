import CrudManager from "@/components/admin/CrudManager";

const TestimonialsManager = () => (
  <CrudManager
    table="testimonials"
    title="Témoignages"
    description="Avis et retours clients défilants"
    orderBy="sort_order"
    fields={[
      { name: "full_name", label: "Nom", type: "text", required: true },
      { name: "role", label: "Rôle / Statut", type: "text" },
      { name: "message", label: "Message", type: "textarea", required: true, rows: 5 },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "rating", label: "Note (1-5)", type: "number" },
      { name: "sort_order", label: "Ordre", type: "number" },
    ]}
    listColumns={[
      { key: "photo_url", label: "Photo", isImage: true },
      { key: "full_name", label: "Nom" },
      { key: "role", label: "Rôle" },
      { key: "rating", label: "Note" },
    ]}
  />
);

export default TestimonialsManager;
