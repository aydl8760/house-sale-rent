export const headerMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "about",
    label: "About",
    path: "/about",
  },

  {
    id: "create",
    label: "Create",
    path: "/create",
  },
];

export const signupFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your name",
    componentType: "input",
    type: "text",
  },

  {
    name: "email",
    label: "Email",
    type: "text",
    componentType: "input",
    placeholder: "Enter your email",
  },

  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    type: "text",
    componentType: "input",
    placeholder: "Enter your email",
  },

  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

const generateYearOptions = (startYear, endYear) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push({ id: year.toString(), label: year.toString() });
  }
  return years;
};

const startYear = 1980;
const currentYear = new Date().getFullYear();
const yearOptions = generateYearOptions(startYear, currentYear);

export const commonFeaturesFormControls = [
  {
    label: "Type",
    name: "listingType",
    componentType: "select",
    options: [
      { id: "rent", label: "Rent" },
      { id: "sale", label: "Sale" },
    ],
  },

  {
    label: "LivingRoom",
    name: "livingRoom",
    componentType: "input",
    type: "number",
  },

  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
  },

  {
    label: "LoundryRoom",
    name: "loundryRoom",
    componentType: "select",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },

  {
    label: "Property-Type",
    name: "propertyType",
    componentType: "select",
    options: [
      { id: "apartment", label: "Apartment" },
      { id: "house", label: "House" },
      { id: "villa", label: "Villa" },
      { id: "studio", label: "Studio" },
      { id: "penthouse", label: "Penthouse" },
    ],
  },

  {
    label: "Parking-Space",
    name: "parking",
    componentType: "select",
    options: [
      { id: "No", label: "No-Parking" },
      { id: "one", label: "1-car" },
      { id: "two", label: "2-car" },
      { id: "three", label: "3+car" },
    ],
  },

  {
    label: "Floor-Level",
    name: "floorLevel",
    componentType: "input",
    type: "number",
  },

  {
    label: "Smart-Home-Features",
    name: "smartHomeFeatures",
    componentType: "custom",
    options: [
      { id: "locks", label: "Smart-Locks" },
      { id: "lights", label: "Smart-Lights" },
      { id: "voice-Controlled", label: "Voice-Controlled Devices" },
    ],
  },
  {
    label: "Furnished-Status",
    name: "furnished",
    componentType: "select",
    options: [
      { id: "fully", label: "Fully-Furnished" },
      { id: "semi", label: "Semi-Furnished," },
      { id: "unfurnished", label: "Unfurnished" },
    ],
  },

  {
    label: "Facilities & Amenities",
    name: "facilitiesAndAmenities",
    componentType: "custom",
    options: [
      { id: "elevator", label: "Elevator" },
      { id: "swimming", label: "Swimming-Pool" },
      { id: "garden", label: "Garden" },
      { id: "balcony", label: "Balcony" },
    ],
  },

  {
    label: "BedRooms",
    name: "bedRoom",
    componentType: "input",
    type: "number",
  },

  {
    label: "Security-Features",
    name: "securityFeatures",
    componentType: "custom",
    options: [
      { id: "cctv", label: "CCTV" },
      { id: "gate", label: "Gated-Community" },
      { id: "gard", label: "Security-Guard" },
      { id: "intercom", label: "Intercom" },
    ],
  },
  {
    label: "BathRoom",
    name: "bathRoom",
    componentType: "input",
    type: "number",
  },

  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",
  },
];

export const saleFeaturesFormControls = [
  {
    label: "Condition",
    name: "condition",
    componentType: "select",
    options: [
      { id: "new", label: "New" },
      { id: "used", label: "Used" },
      { id: "construction", label: "Under-Construction" },
      { id: "renovated", label: "Renovated" },
    ],
  },
  {
    label: "Discount Price",
    name: "discountPrice",
    componentType: "input",
    type: "number",
  },
  {
    label: "Year",
    name: "year",
    componentType: "select",
    options: yearOptions,
    type: "number",
  },
  {
    label: "Pricetype",
    name: "priceType",
    type: "number",
    componentType: "select",
    options: [
      { id: "fixedPrice", label: "Fixed-Price" },
      { id: "negotiable", label: "Negotiable" },
    ],
  },
  {
    label: "Area (sqm)",
    name: "Floararea",
    componentType: "input",
    type: "text",
  },
  {
    label: "Business-Types",
    name: "businessTypes",
    componentType: "select",
    options: [
      { id: "agent", label: "Agent" },
      { id: "private", label: "Private" },
      { id: "broker", label: "Broker" },
    ],
  },

  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
  },
  {
    label: "Are all necessary legal documents available?",
    name: "legalDocument",
    componentType: "select",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
  {
    label: "Time To Contact",
    name: "timeToContact",
    componentType: "select",
    options: [
      { id: "morning", label: "Morning" },
      { id: "afternoon", label: "AfterNoon" },
      { id: "anyTime", label: "Any-Time" },
    ],
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
  },
  {
    label: "Location",
    name: "location",
    componentType: "input",
    type: "text",
  },
];

export const rentFeaturesFormControls = [
  {
    label: "Regular Price(/months)",
    name: "regularPrice",
    componentType: "input",
    type: "number",
  },
  {
    label: "Payment Terms",
    name: "paymentMethodRent",
    componentType: "select",
    options: [
      { id: "monthly", label: "Monthly" },
      { id: "quarterly", label: "Quarterly" },
      { id: "semiAnnual", label: "Semi-Annual" },
      { id: "annual", label: "Annual" },
    ],
  },

  {
    label: "Discount Price",
    name: "discountPrice",
    componentType: "input",
    type: "number",
  },
  {
    label: "Business-Types",
    name: "businessTypes",
    componentType: "select",
    options: [
      { id: "agent", label: "Agent" },
      { id: "private", label: "Private" },
      { id: "broker", label: "Broker" },
    ],
  },
  {
    label: "Pricetype",
    name: "priceType",
    type: "number",
    componentType: "select",
    options: [
      { id: "fixedPrice", label: "Fixed-Price" },
      { id: "negotiable", label: "Negotiable" },
    ],
  },
  {
    label: "Time To Contact",
    name: "timeToContact",
    componentType: "select",
    options: [
      { id: "morning", label: "Morning" },
      { id: "afternoon", label: "AfterNoon" },
      { id: "anyTime", label: "Any-Time" },
    ],
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
  },
  {
    label: "Location",
    name: "location",
    componentType: "input",
    type: "text",
  },
];
