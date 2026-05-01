import CrudManager from "@/components/admin/CrudManager";

const ProgramsManager = () => (
  <CrudManager
    table="programs"
    title="Programmes & Activités"
    description="Hebdomadaire, Mensuel et Annuel — section Cameroun"
    orderBy="sort_order"
    fields={[
      { name: "title", label: "Titre", type: "text", required: true },
      {
        name: "period", label: "Période", type: "select", required: true,
        options: [
          { value: "hebdomadaire", label: "Hebdomadaire" },
          { value: "mensuel", label: "Mensuel" },
          { value: "annuel", label: "Annuel" },
        ],
      },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image", type: "image" },
      { name: "event_date", label: "Date de l'événement", type: "text" },
      { name: "sort_order", label: "Ordre", type: "number" },
    ]}
    listColumns={[
      { key: "image_url", label: "Image", isImage: true },
      { key: "title", label: "Titre" },
      { key: "period", label: "Période" },
      { key: "event_date", label: "Date" },
    ]}
  />
);

export default ProgramsManager;
