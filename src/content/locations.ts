import type { OfficeLocationRecord } from "@/types/content";

export const officeLocationsData: OfficeLocationRecord[] = [
  {
    id: "loc-us",
    country: "United States",
    address: "3891 Ranchview Dr. Richardson, California 62639",
    addressHref: "https://maps.app.goo.gl/dinshLuUdz3UuHSDA",
    phone: "+61 5 65 102 259",
    phoneHref: "tel:+61565102259",
    email: "valtriix@mail.com",
    emailHref: "mailto:valtriix@mail.com",
  },
  {
    id: "loc-uk",
    country: "United Kingdom",
    address: "18 King Street, London, EC2V 8EA",
    addressHref: "https://maps.app.goo.gl/BgsujtKVPzCGEeB7A",
    phone: "+44 20 7946 0321",
    phoneHref: "tel:+442079460321",
    email: "london@valtriix.com",
    emailHref: "mailto:london@valtriix.com",
  },
  {
    id: "loc-au",
    country: "Australia",
    address: "120 Collins Street, Melbourne, VIC 3000",
    addressHref: "https://maps.app.goo.gl/q9zp7bVA9QgH6nXy9",
    phone: "+61 3 5550 2846",
    phoneHref: "tel:+61355502846",
    email: "melbourne@valtriix.com",
    emailHref: "mailto:melbourne@valtriix.com",
  },
];

export const contactMapAsset = {
  src: "/assets/images/general/map.webp",
  alt: "Illustrative Brooklyn street map near Valtriix advisory offices",
};

export const collaboratorAvatars = [
  { name: "Advisor portrait 1", src: "/assets/images/general/avatar-2.webp" },
  { name: "Advisor portrait 2", src: "/assets/images/general/avatar-3.webp" },
  { name: "Advisor portrait 3", src: "/assets/images/general/avatar-4.webp" },
];
