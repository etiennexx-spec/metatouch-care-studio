import CrudManager from "@/components/admin/CrudManager";

const ServicesManager = () => (
  <CrudManager
    table="services"
    title="Services"
    description="Services proposés par Meta Cares"
    orderBy="sort_order"
    fields={[
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "short_description", label: "Description courte", type: "textarea", rows: 2 },
      { name: "icon", label: "Icône (nom Lucide)", type: "text" },
      { name: "image_url", label: "Image", type: "image" },
      { name: "details", label: "Contenu détaillé", type: "textarea", rows: 6 },
      { name: "link_url", label: "Lien externe (optionnel)", type: "text" },
      { name: "sort_order", label: "Ordre", type: "number" },
    ]}
    listColumns={[
      { key: "image_url", label: "Image", isImage: true },
      { key: "title", label: "Titre" },
      { key: "short_description", label: "Description" },
    ]}
  />
);

export default ServicesManager;
