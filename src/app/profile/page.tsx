"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "../../components/shadcn/button";
import { Input } from "../../components/shadcn/input";
import { Label } from "../../components/shadcn/label";
import { Skeleton } from "../../components/shadcn/skeleton";
import { LoginProps } from "@/app/_navbar/navbarTypes";

const ProfilePage = (props: LoginProps) => {
  // const { email } = props;
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [loading, setLoading] = useState(true);

  // Separate editing states for each section
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === "authenticated") {
          const response = await fetch("/api/account/user/update", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "session": JSON.stringify({ session }),
            },
          });
          console.log(response);

          if (response.ok) {
            const data = await response.json();
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
            setPhone(data.phone || "");
            setAddress({
              street: data.address?.street || "",
              city: data.address?.city || "",
              state: data.address?.state || "",
              country: data.address?.country || "",
              zip: data.address?.zip || "",
            });
          } else {
            console.error("Failed to fetch data:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status]);

  const handleSavePersonalInfo = async () => {
    const updatedInfo = { firstName, lastName, phone };
    const res = await fetch("/api/account/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedInfo, session }),
    });
    if (res.ok) {
      alert("Personal information updated!");
      setIsEditingPersonalInfo(false);
    } else {
      alert("Failed to update personal information");
    }
  };

  const handleSaveAddress = async () => {
    const res = await fetch("/api/account/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });
    if (res.ok) {
      alert("Address updated!");
      setIsEditingAddress(false);
    } else {
      alert("Failed to update address");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

      {loading ? (
        <Skeleton className="h-80" />
      ) : (
        <>
          {/* Personal Information Section */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditingPersonalInfo}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditingPersonalInfo}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditingPersonalInfo}
                  className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    disabled={!isEditingAddress}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    disabled={!isEditingAddress}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    disabled={!isEditingAddress}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                    disabled={!isEditingAddress}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
              </div>
              <div>
                <Label>ZIP Code</Label>
                <Input
                  value={address.zip}
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
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

export default ProfilePage;
