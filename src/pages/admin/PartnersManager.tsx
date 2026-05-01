import CrudManager from "@/components/admin/CrudManager";

const PartnersManager = () => (
  <CrudManager
    table="partners"
    title="Partenaires"
    description="Logos et liens des partenaires"
    orderBy="sort_order"
    fields={[
      { name: "name", label: "Nom", type: "text", required: true },
      { name: "logo_url", label: "Logo", type: "image" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "link_url", label: "Lien (URL)", type: "text" },
      { name: "sort_order", label: "Ordre", type: "number" },
    ]}
    listColumns={[
      { key: "logo_url", label: "Logo", isImage: true },
      { key: "name", label: "Nom" },
      { key: "link_url", label: "Lien" },
    ]}
  />
);

export default PartnersManager;
