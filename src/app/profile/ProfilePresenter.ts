import { useEffect, useState } from 'react';
import { Session } from "next-auth";

export class ProfilePresenter {
  private session: Session | null;

  constructor(session: Session | null) {
    this.session = session;
  }

  public useProfile() {
    const [personalInfo, setPersonalInfo] = useState({
      firstName: "",
      lastName: "",
      phone: "",
    });
    const [address, setAddress] = useState({
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    });
    const [loading, setLoading] = useState(true);
    const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const fetchData = async () => {
      if (this.session && this.session.user) {
        try {
          const response = await fetch("/api/account/user/update", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "session": JSON.stringify({ session: this.session }),
            },
          });

          if (response.ok) {
            const data = await response.json();
            setPersonalInfo({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              phone: data.phone || "",
            });
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
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const handleSavePersonalInfo = async () => {
      const res = await fetch("/api/account/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedInfo: personalInfo, session: this.session }),
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
        body: JSON.stringify({ address, session: this.session }),
      });
      if (res.ok) {
        alert("Address updated!");
        setIsEditingAddress(false);
      } else {
        alert("Failed to update address");
      }
    };

    useEffect(() => {
      fetchData();
    }, [this.session]);

    return {
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
    };
  }
}
