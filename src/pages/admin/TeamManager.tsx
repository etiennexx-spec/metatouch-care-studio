import CrudManager from "@/components/admin/CrudManager";

const TeamManager = () => (
  <CrudManager
    table="team_members"
    title="Équipe"
    description="Gérez les membres de l'équipe Belgique et Cameroun"
    orderBy="sort_order"
    fields={[
      { name: "full_name", label: "Nom complet", type: "text", required: true },
      { name: "role", label: "Rôle / Fonction", type: "text", required: true },
      {
        name: "branch", label: "Branche", type: "select", required: true,
        options: [
          { value: "belgique", label: "Belgique (Administration)" },
          { value: "cameroun", label: "Cameroun (Opérationnel)" },
        ],
      },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "bio", label: "Bio / Présentation", type: "textarea" },
      { name: "missions", label: "Missions", type: "textarea" },
      { name: "vision", label: "Vision", type: "textarea" },
      { name: "formation", label: "Formation", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Téléphone", type: "text" },
      { name: "slug", label: "Slug (pour URL /equipe/:slug)", type: "text" },
      { name: "sort_order", label: "Ordre d'affichage", type: "number" },
    ]}
    listColumns={[
      { key: "photo_url", label: "Photo", isImage: true },
      { key: "full_name", label: "Nom" },
      { key: "role", label: "Rôle" },
      { key: "branch", label: "Branche" },
      { key: "sort_order", label: "Ordre" },
    ]}
  />
);

export default TeamManager;
