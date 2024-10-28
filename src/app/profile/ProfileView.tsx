"use client";

import { useSession } from "next-auth/react";
import { ProfilePresenter } from "./ProfilePresenter"; 
import { Button } from "../../components/shadcn/button";
import { Input } from "../../components/shadcn/input";
import { Label } from "../../components/shadcn/label";
import { Skeleton } from "../../components/shadcn/skeleton";
import { LoginProps } from "@/app/_navbar/navbarTypes";

const ProfileView = (props: LoginProps) => {
  const { data: session } = useSession();
  const presenter = new ProfilePresenter(session);
  const {
    personalInfo,
    address,
    loading,
    isEditingPersonalInfo,
    isEditingAddress,
    setPersonalInfo,
    setAddress,
    handleSavePersonalInfo,
    handleSaveAddress,
    setIsEditingPersonalInfo,
    setIsEditingAddress,
  } = presenter.useProfile();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

      {loading ? (
        <Skeleton className="h-80" />
      ) : (
        <>
          <section className="bg-white p-6 rounded-lg shadow-lg space-y-6 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {!isEditingPersonalInfo && (
                <Button
                  onClick={() => setIsEditingPersonalInfo(true)}
                  variant="outline"
                >
                  Edit
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <div className="border rounded-md p-2 bg-gray-100">
                  {session?.user?.email || 'Not provided'}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                    disabled={!isEditingPersonalInfo}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                    disabled={!isEditingPersonalInfo}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  disabled={!isEditingPersonalInfo}
                  className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                />
              </div>
              {isEditingPersonalInfo && (
                <div className="flex justify-end space-x-4">
                  <Button onClick={handleSavePersonalInfo}>Save</Button>
                  <Button
                    onClick={() => setIsEditingPersonalInfo(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Address Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg space-y-6 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Address</h2>
              {!isEditingAddress && (
                <Button
                  onClick={() => setIsEditingAddress(true)}
                  variant="outline"
                >
                  Edit
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Street Address</Label>
                  <Input
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    disabled={!isEditingAddress}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    disabled={!isEditingAddress}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    disabled={!isEditingAddress}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    disabled={!isEditingAddress}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
              </div>
              <div>
                <Label>ZIP Code</Label>
                <Input
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                  disabled={!isEditingAddress}
                  className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                />
              </div>
              {isEditingAddress && (
                <div className="flex justify-end space-x-4">
                  <Button onClick={handleSaveAddress}>Save</Button>
                  <Button
                    onClick={() => setIsEditingAddress(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProfileView;
