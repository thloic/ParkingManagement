"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

type Parking = {
  id: number;
  name: string;
  location: string;
  totalSpaces: number;
};

export default function ParkingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editId, setEditId] = useState<number | null>(null);
  const [parking, setParking] = useState<Parking[]>([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    totalSpaces: 0,
  });

  useEffect(() => {
    fetch("/api/parking")
      .then((res) => res.json())
      .then((data) => setParking(data))
      .catch((err) => console.error("Erreur lors du fetch:", err));
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce parking ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/parking/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("La suppression a échoué");
      }

      toast.success("Parking supprimé");
      setParking(parking.filter(p => p.id.toString() !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Une erreur est survenue");
    }
  };

  const handleAddParking = async () => {
    try {
      const res = await fetch("/api/parking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      const createdParking = await res.json();
      setParking([...parking, createdParking]);
      resetForm();
      toast.success("Parking ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l’ajout:", error);
      toast.error("Échec de l’ajout du parking.");
    }
  };

  const handleUpdate = async () => {
    if (!editId) return;

    try {
      const loadingToast = toast.loading("Mise à jour du parking en cours...");

      const response = await fetch(`/api/parking/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(await response.text());

      const updated = await response.json();
      toast.success("Parking mis à jour avec succès!", { id: loadingToast });

      setParking(parking.map(p => (p.id === editId ? updated : p)));
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const openEditModal = (p: Parking) => {
    setFormMode("edit");
    setEditId(p.id);
    setForm({
      name: p.name,
      location: p.location,
      totalSpaces: p.totalSpaces,
    });
    setIsOpen(true);
  };

  const resetForm = () => {
    setForm({ name: "", location: "", totalSpaces: 0 });
    setEditId(null);
    setFormMode("create");
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Liste des parkings</h1>
        <button
          onClick={() => {
            setFormMode("create");
            setIsOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Ajouter un parking
        </button>
      </div>

      <div className="bg-white shadow rounded-md p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Emplacement</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total Places</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {parking.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4">{p.location}</td>
                <td className="px-6 py-4">{p.totalSpaces}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openEditModal(p)}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(p.id.toString())}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={resetForm} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-medium mb-4">
              {formMode === "create" ? "Ajouter un parking" : "Modifier un parking"}
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emplacement</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Places</label>
                <input
                  type="number"
                  value={form.totalSpaces}
                  onChange={(e) => setForm({ ...form, totalSpaces: Number(e.target.value) })}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={formMode === "create" ? handleAddParking : handleUpdate}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {formMode === "create" ? "Ajouter" : "Mettre à jour"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
