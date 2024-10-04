import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  basketId: string | null;
  login: (user: User, basketId: string) => void;
  logout: () => void;
}

//create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//create Default Basket
const createDefaultBasket = async () => {
  try {
    const response = await fetch("http://localhost:8000/user/default/basket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: "default" }),
    });

    if (!response.ok) {
      throw new Error("Failed to create default basket");
    }

    const data = await response.json();
    return data.basketId;
  } catch (error) {
    console.error("Error creating default basket:", error);
    throw error;
  }
};

//AuthProvider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize state with user data from local storage, if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [basketId, setBasketId] = useState<string | null>(() => {
    const storedbasketId = localStorage.getItem("basketId");
    return storedbasketId ? storedbasketId : null;
  });

  const login = (user: User, basketId: string) => {
    console.log("Logging in user:", user);
    setUser(user);
    setBasketId(basketId);
    localStorage.setItem("user", JSON.stringify(user)); // Save user data to local storage
    localStorage.setItem("basketId", basketId);
  };

  const logout = () => {
    console.log("Logging out");
    setUser(null);
    setBasketId(null);
    localStorage.removeItem("user"); // Remove user data from local storage
    localStorage.removeItem("basketId");

    createDefaultBasket() // Create default basket when user logs out
      .then((basketId) => {
        setBasketId(basketId);
        localStorage.setItem("basketId", basketId);
      })
      .catch((error) => {
        console.error("Error creating default basket:", error);
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedbasketId = localStorage.getItem("basketId");
    if (!storedbasketId) {
      createDefaultBasket()
        .then((basketId) => {
          setBasketId(basketId);
          localStorage.setItem("basketId", basketId);
        })
        .catch((error) => {
          console.error("Error creating default basket:", error);
        });
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedbasketId) {
      setBasketId(storedbasketId);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, basketId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Context consumer
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
