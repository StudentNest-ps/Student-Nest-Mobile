"use client";

import {
  X,
  MapPin,
  Edit,
  Trash2,
  Wifi,
  Car,
  Tv,
  Snowflake
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Property } from "@/services/owner.service";
import { ScrollArea } from "../UI/scroll-area";
import { useState } from "react";
import { propertyService } from "@/services/property.service";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../UI/dialog";
import { Button } from "../UI/button";
import { EditPropertyModal } from "./EditPropertyModal";

interface OwnerApartmentsListProps {
  onClose: () => void;
  apartments: Property[];
  onPropertyUpdated: () => void; // Callback to refresh properties list
}

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case "wifi":
      return <Wifi className="w-4 h-4 text-cyan-400" />;
    case "parking":
      return <Car className="w-4 h-4 text-amber-400" />;
    case "tv":
      return <Tv className="w-4 h-4 text-purple-400" />;
    case "ac":
      return <Snowflake className="w-4 h-4 text-blue-300" />;
    default:
      return null;
  }
};

export const OwnerApartmentsList = ({
  onClose,
  apartments,
  onPropertyUpdated
}: OwnerApartmentsListProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
  
  const handleEditProperty = (property: Property) => {
    setPropertyToEdit(property);
    setShowEditModal(true);
  };

  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!propertyToDelete?._id) return;
    
    try {
      const success = await propertyService.deleteProperty(propertyToDelete._id);
      if (success) {
        toast.success("Property deleted successfully");
        setDeleteDialogOpen(false);
        onPropertyUpdated(); // Refresh the properties list
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the property");
      console.error(error);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-700 bg-white dark:bg-gray-900 backdrop-blur-lg max-h-[90vh]p-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
              <h2 className="w-full text-center text-3xl font-bold text-gray-900 dark:text-white tracking-wide">
                My Apartments
              </h2>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                <X className="h-6 w-6" color="currentColor" />
              </motion.button>
            </div>
            <ScrollArea className="h-[70vh] w-full ">
              {apartments.length > 0 ? (
                <div className="space-y-6">
                  {apartments.map((apartment) => (
                    <motion.div
                      key={apartment._id}
                      className="rounded-xl border border-gray-700 p-5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex gap-6">
                        <div className="w-32 h-32 min-w-[8rem] overflow-hidden rounded-lg border-2 border-gray-700 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          {apartment.image ? (
                            <img
                              src={apartment.image}
                              alt={apartment.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Hide the broken image
                                e.currentTarget.style.display = 'none';
                                // Show parent div with background color
                                e.currentTarget.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
                                  <span>${apartment.title.charAt(0)}</span>
                                </div>`;
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
                              <span>{apartment.title.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {apartment.title}
                            </h3>
                            <p className="text-lg font-bold text-black dark:text-white">
                              ${apartment.price}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {apartment.description}
                          </p>

                          <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300 text-sm">
                            <MapPin className="h-12 w-12 text-pink-400" />
                            <p>
                              {apartment.address}, {apartment.city}, {apartment.country}
                            </p>
                          </div>

                          <div className="flex gap-3 mt-2 flex-wrap">
                            {apartment.amenities.map((amenity) => (
                              <div
                                key={amenity}
                                className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full"
                              >
                                {getAmenityIcon(amenity)}
                                {amenity}
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-3 mt-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700"
                              onClick={() => handleEditProperty(apartment)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-600 rounded-full shadow-md hover:bg-red-700"
                              onClick={() => handleDeleteClick(apartment)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                  <p className="text-lg">
                    You haven't listed any properties yet.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="mt-6 px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow-lg hover:bg-emerald-700"
                  >
                    Add Your First Property
                  </motion.button>
                </div>
              )}
            </ScrollArea>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete "{propertyToDelete?.title}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Property Modal */}
      {showEditModal && propertyToEdit && (
        <EditPropertyModal
          property={propertyToEdit}
          onClose={() => setShowEditModal(false)}
          onPropertyUpdated={onPropertyUpdated}
        />
      )}
    </>
  );
};