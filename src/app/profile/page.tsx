"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/shadcn/button";
import { Input } from "../../components/shadcn/input";
import { Label } from "../../components/shadcn/label";
import { Skeleton } from "../../components/shadcn/skeleton"; 

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/account/user/update/get");
      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.profilePicture);
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress({
          street: data.address?.street || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          country: data.address?.country || "",
          zip: data.address?.zip || "",
        });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/account/user/profileImage", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setProfilePicture(URL.createObjectURL(file));
        alert("Profile picture updated!");
      } else {
        alert("Failed to upload image");
      }
    }
  };

  const handleSaveInfo = async () => {
    const updatedInfo = { firstName, lastName, email, phone, address };
    const res = await fetch("/api/account/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    });
    if (res.ok) {
      alert("Profile information updated!");
    } else {
      alert("Failed to update information");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>

      {loading ? (
        <Skeleton className="h-80" />
      ) : (
        <>
          <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="h-24 w-24 rounded-full mb-4" />
            ) : (
              <div className="h-24 w-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                No Picture
              </div>
            )}
            <input type="file" onChange={handleProfilePicUpload} />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
              </div>
            </div>
            <Button onClick={handleSaveInfo}>Save Personal Info</Button>
          </section>

          {/* Address Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Street Address</Label>
                <Input
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="Street address"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="City"
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  placeholder="State"
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  placeholder="Country"
                />
              </div>
              <div>
                <Label>ZIP Code</Label>
                <Input
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                  placeholder="ZIP code"
                />
              </div>
            </div>
            <Button onClick={handleSaveInfo}>Save Address</Button>
          </section>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
