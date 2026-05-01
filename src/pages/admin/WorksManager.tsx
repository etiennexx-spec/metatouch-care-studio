import CrudManager from "@/components/admin/CrudManager";

const WorksManager = () => (
  <CrudManager
    table="works"
    title="Nos Travaux"
    description="Vidéos et flyers du carrousel de l'équipe Cameroun"
    orderBy="sort_order"
    fields={[
      { name: "title", label: "Titre", type: "text", required: true },
      {
        name: "media_type", label: "Type", type: "select", required: true,
        options: [
          { value: "image", label: "Image / Flyer" },
          { value: "video", label: "Vidéo" },
        ],
      },
      { name: "media_url", label: "Fichier média", type: "file", required: true, accept: "image/*,video/*" },
      { name: "thumbnail_url", label: "Vignette (pour vidéo)", type: "image" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "sort_order", label: "Ordre", type: "number" },
    ]}
    listColumns={[
      { key: "thumbnail_url", label: "Aperçu", isImage: true },
      { key: "title", label: "Titre" },
      { key: "media_type", label: "Type" },
    ]}
  />
);

export default WorksManager;
