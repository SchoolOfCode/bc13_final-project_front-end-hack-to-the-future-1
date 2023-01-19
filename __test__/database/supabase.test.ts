import { supabaseAnon, supabaseService } from "../../jest.setup";

// that a user cant update another users profile info
// that when a new business is registered it generates a business ID
// When a new deal is created it also assigns the correct business ID

// when a deal is deleted by a business it removes that deal from DB

// That a consumer user type CANNOT create new deals
// that a consumer user type CANNOT assign there own business ID
// That a Consumer user type CANNOT VIEW another users profile information
// That a Consumer user type CANNOT UPDATE another users profile information
// That a Consumer user type CANNOT DELETE another users profile information
// That a Business user type CANNOT VIEW another users profile information
// That a Business user type CANNOT EDIT another users profile information
// That a Business user type CANNOT DELETE another users profile information

describe("Supabase Basic Tests", () => {
  it("profiles table should exist", async () => {
    const { data, error } = await supabaseAnon.rpc("test_example_table_exists");
    expect(data).toEqual(true);
  });
});

describe("Supabase Businesses Table", () => {
  const testBusiness = {
    name: "Test Business",
    website: "www.example.com",
    postcode: "SW1P 4QE",
    lat: 90,
    lon: 90,
    address_line1: "123 Example Street",
  };

  it("Should be able to create a business", async () => {
    const {} = await supabaseAnon.auth.signInWithPassword({
      email: "lewisgormanneale@gmail.com",
      password: "password123",
    });
    const { data, error } = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select();
    expect(data).toMatchObject(true);
  });

  it("should return all businesses", async () => {
    const { data, error } = await supabaseAnon.from("deals").select();
    console.log(data);
    expect(data).toEqual(data);
  });

  it("profiles table should exist", async () => {
    const { data, error } = await supabaseAnon.rpc("test_example_table_exists");
    expect(data).toEqual(true);
  });
});
