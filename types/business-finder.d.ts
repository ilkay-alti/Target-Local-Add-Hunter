export type Location = {
  lat: number;
  lng: number;
};

export type Business = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  hours?: {
    display: string;
    open_now: boolean;
    regular: Array<{
      day: number;
      open: string;
      close: string;
    }>;
  };
  photos: Array<{
    url: string;
  }>;
  categories: Array<{
    name: string;
  }>;
  distance: number;
  rating?: number;
  isOpen?: boolean;
};

// Props tipleri
export type MapComponentProps = {
  center: Location;
  radius: number;
  businesses?: Business[];
};

export type BusinessFinderProps = {
  sectors: string[];
};
