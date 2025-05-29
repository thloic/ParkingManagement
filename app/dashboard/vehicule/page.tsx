"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { PlusIcon, PencilIcon, Trash2Icon, Printer } from "lucide-react";
import { toast } from "sonner";
import { Parking } from "@prisma/client";
import jsPDF from "jspdf";



type Vehicule = {
  id: number;
  plate: string;
  type: 'voiture' | 'Moto' | 'Camion';
  entryTime: string;
  status: string;
  parkingId?: number;
  parking?: Parking; 
};

export default function VehiculesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [parkings, setParkings] = useState<{id: number, name: string}[]>([]);

  const [form, setForm] = useState({
    plate: "",
    type: "",
    entryTime: "",
    status: "present",
    parkingId: "",
  });


  
  const handlePrint = async (vehicule: Vehicule) => {
    const { entryTime, plate, parking } = vehicule;
    const currentTime = new Date();
  
    const entry = new Date(entryTime);
    const durationInMs = currentTime.getTime() - entry.getTime();
    const durationInHours = Math.ceil(durationInMs / (1000 * 60 * 60));
    const tarifHoraire = 500;
    const montant = durationInHours * tarifHoraire;
  
    try {
      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          vehicleId: vehicule.id,
          amount: montant
        })
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log("Ticket généré avec succès !");
        toast.success("Ticket généré avec succès");
  
        // ✅ GÉNÉRATION DU PDF
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Ticket de stationnement", 20, 20);
  
        doc.setFontSize(12);
        doc.text(`Plaque : ${plate}`, 20, 40);
        // doc.text(`Emplacement : ${parking?.name ?? 'N/A'}`, 20, 50);
        doc.text(`Heure d'entrée : ${entry.toLocaleString()}`, 20, 60);
        doc.text(`Heure de sortie : ${currentTime.toLocaleString()}`, 20, 70);
        doc.text(`Durée : ${durationInHours} heure(s)`, 20, 80);
        doc.text(`Montant : ${montant} FCFA`, 20, 90);
  
        // 💾 TÉLÉCHARGEMENT
        doc.save(`ticket-${plate}.pdf`);
      } else {
        console.error("Erreur lors de la génération du ticket");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };
  


  useEffect(() => {
    fetchData();
    fetchParkings();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/Vehicule");
      const data = await res.json();
      setVehicules(data);
      console.log("bonne recuperation",data)
    } catch (err) {
      console.error("Erreur lors du fetch:", err);
      toast.error("Erreur lors du chargement des véhicules");
    }
  };

  const fetchParkings = async () => {
    try {
      const res = await fetch("/api/parking/disponibles");
      const data = await res.json();
      setParkings(data);
      console.log("bonne recuperation",data)
    } catch (err) {
      console.error("Erreur lors du fetch des parkings:", err);
    }
  };


  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce véhicule?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/Vehicule/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("La suppression a échoué");
      }

      toast.success("Véhicule supprimé");
      setVehicules(vehicules.filter(v => v.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Une erreur est survenue lors de la suppression");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formMode === "create") {
      await handleAddVehicule();
    } else {
      await handleUpdate();
    }
  };

  const handleAddVehicule = async () => {
    try {
      const res = await fetch("/api/Vehicule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plate: form.plate, 
          type: form.type,
          parkingId: form.parkingId ? parseInt(form.parkingId) : null,
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      const createdVehicule = await res.json();
      setVehicules([...vehicules, createdVehicule]);
      resetForm();
      toast.success("Véhicule ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      toast.error("Échec de l'ajout du véhicule.");
    }
  };

  const handleUpdate = async () => {
    if (!editId) return;

    try {
      const loadingToast = toast.loading("Mise à jour du véhicule en cours...");

      const response = await fetch(`/api/Vehicule/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          parkingId: form.parkingId ? parseInt(form.parkingId) : null,
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      const updated = await response.json();
      toast.success("Véhicule mis à jour avec succès!", { id: loadingToast });

      setVehicules(vehicules.map(v => (v.id === editId ? updated : v)));
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const openEditModal = (v: Vehicule) => {
    setFormMode("edit");
    setEditId(v.id);
    setForm({
      plate: v.plate,
      type: v.type,
      entryTime: v.entryTime.split('T')[0], // Just the date part
      status: v.status,
      parkingId: v.parkingId?.toString() || "",
    });
    
    if (v.parkingId) {
    }
    
    setIsOpen(true);
  };

  const resetForm = () => {
    setForm({ 
      plate: "", 
      type: "", 
      entryTime: "", 
      status: "present",
      parkingId: "",
    });
    setEditId(null);
    setFormMode("create");
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Liste des véhicules
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Ajouter un véhicule
        </button>
      </div>

      {/* Liste des véhicules */}
      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Immatriculation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entrée
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Parking
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
                </th>
              </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {vehicules.map((vehicule) => (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{vehicule.plate}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {vehicule.type === 'voiture' && 'voiture'}
        {vehicule.type === 'Moto' && 'Moto'}
        {vehicule.type === 'Camion' && 'Camion'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(vehicule.entryTime).toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </td >
      <td className="px-6 py-4 whitespace-nowrap">
          {vehicule.parking?.name || 'pas recuperer'}
      </td>      
<td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${vehicule.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {vehicule.status ? 'Present' : 'Sorti'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => openEditModal(vehicule)}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleDelete(vehicule.id)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash2Icon className="w-5 h-5" />
        </button>
        <button
          onClick={() => handlePrint(vehicule)}
          className="text-gray-600 px-4 hover:text-red-900"
        >
          <Printer className="w-5 h-5" />
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-medium mb-4">
              {formMode === "create" ? "Ajouter un véhicule" : "Modifier le véhicule"}
            </Dialog.Title>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Immatriculation
                  </label>
                  <input
                    type="text"
                    value={form.plate}
                    onChange={(e) =>
                      setForm({ ...form, plate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de véhicule*
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="voiture">voiture</option>
                    <option value="Moto">Moto</option>
                    <option value="Camion">Camion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parking
                  </label>
                  <select
                    value={form.parkingId}
                    // onChange={handleParkingChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Sélectionnez un parking</option>
                    {parkings.map(parking => (
                      <option key={parking.id} value={parking.id}>
                        {parking.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  {formMode === "create" ? "Ajouter" : "Mettre à jour"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}