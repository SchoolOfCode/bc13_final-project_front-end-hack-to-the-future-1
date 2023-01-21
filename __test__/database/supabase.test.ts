import { supabaseAnon, supabaseService } from "../../jest.setup";

const businessUser1 = {
  email: "fawiwe3771@moneyzon.com",
  password: "password123",
};

const businessUser1ID = "44437ab8-2ab2-49d6-a71a-fe8f49f39032";

const businessUser2 = {
  email: "bilisaw709@quamox.com",
  password: "password123",
};

describe("Supabase Testing for Profiles Table Row Level Security", () => {
  it("Should not be able to view a profile when not logged in", async () => {
    const { statusText } = await supabaseAnon
      .from("profiles")
      .select()
      .eq("id", businessUser1ID)
      .single();
    expect(statusText).toEqual("Not Acceptable");
  });

  it("Should not be able to create a profile when not logged in", async () => {
    const newProfile = {
      id: "5bade4e6-5383-4bfb-9df4-29a276f4cecb",
      user_type: "consumer",
      full_name: "Test Profile",
    };

    const { statusText } = await supabaseAnon
      .from("profiles")
      .insert(newProfile)
      .select()
      .single();
    expect(statusText).toEqual("Unauthorized");
  });

  it("Should not be able to edit a profile when not logged in", async () => {
    const { statusText } = await supabaseAnon
      .from("profiles")
      .update({
        full_name: "Updated Test Profile",
      })
      .eq("id", businessUser1ID)
      .single();
    expect(statusText).toEqual("Not Acceptable");
  });

  it("Should not be able to delete a profile when not logged in", async () => {
    const { statusText } = await supabaseAnon
      .from("profiles")
      .delete()
      .eq("id", businessUser1ID)
      .single();
    expect(statusText).toEqual("Not Acceptable");
  });

  it("Testing as Business User 1: Should be able to login, and be authenticated.", async () => {
    const { data } = await supabaseAnon.auth.signInWithPassword(businessUser1);
    expect(data.session?.user.role).toEqual("authenticated");
  });

  it("Testing as Business User 1: Should be able to update a profile assigned to their user_id", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();
    const { data } = await supabaseAnon
      .from("profiles")
      .update({
        full_name: "Test Profile Updated",
      })
      .eq("id", user?.id)
      .select();
    expect(data![0].full_name).toEqual("Test Profile Updated");
  });

  it("Business User 1 Logs Out", async () => {
    const { error } = await supabaseAnon.auth.signOut();
    expect(error).toEqual(null);
  });
});

describe("Supabase Testing for Businesses Table Row Level Security", () => {
  it("Should not be able to create a business while not logged in", async () => {
    const testBusiness = {
      name: "Test Business",
      website: "www.example.com",
      postcode: "SW1P 4QE",
      lat: 90,
      lon: 90,
      address_line1: "123 Example Street",
    };

    const { statusText } = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select()
      .single();
    expect(statusText).toEqual("Unauthorized");
  });

  it("Testing as Business User 1: Should be able to login, and be authenticated.", async () => {
    const { data } = await supabaseAnon.auth.signInWithPassword(businessUser1);

    expect(data.session?.user.role).toEqual("authenticated");
  });

  it("Testing as Business User 1: Should be able to create a business while logged in", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();

    const testBusiness = {
      name: "Test Business",
      website: "www.example.com",
      postcode: "SW1P 4QE",
      lat: 90,
      lon: 90,
      address_line1: "123 Example Street",
      user_id: user?.id,
    };

    const businessResponse = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select()
      .single();
    expect(businessResponse.data).toEqual(
      expect.objectContaining(testBusiness)
    );
  });

  it("Testing as Business User 1: Should be able to update a business assigned to their user_id", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();
    const { data } = await supabaseAnon
      .from("businesses")
      .update({
        name: "Test Business Updated",
      })
      .eq("user_id", user?.id)
      .select();
    expect(data![0].name).toEqual("Test Business Updated");
  });

  it("Testing as Business User 1: Should be able to delete a business assigned to their user_id", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();
    const { data } = await supabaseAnon
      .from("businesses")
      .delete()
      .eq("user_id", user?.id)
      .select();
    expect(data![0].user_id).toEqual(user?.id);
  });

  it("Business User 1 Creates Another Business For Additional Testing From Business User 2", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();

    const testBusiness = {
      name: "Test Business",
      website: "www.example.com",
      postcode: "SW1P 4QE",
      lat: 90,
      lon: 90,
      address_line1: "123 Example Street",
      user_id: user?.id,
    };

    const businessResponse = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select()
      .single();
    expect(businessResponse.data).toEqual(
      expect.objectContaining(testBusiness)
    );
  });

  it("Business User 1 Logs Out", async () => {
    const { error } = await supabaseAnon.auth.signOut();
    expect(error).toEqual(null);
  });

  it("Testing as Business User 2: Should be able to login, and be authenticated.", async () => {
    const { data } = await supabaseAnon.auth.signInWithPassword(businessUser2);
    expect(data.session?.user.role).toEqual("authenticated");
  });

  it("Testing as Business User 2: Should not be able to update a business not assigned to their user_id", async () => {
    const { error } = await supabaseAnon
      .from("businesses")
      .update({
        name: "Test Business Updated",
      })
      .eq("user_id", businessUser1ID)
      .select();

    const { data } = await supabaseAnon
      .from("businesses")
      .select()
      .eq("user_id", businessUser1ID);
    expect(data![0].name).toEqual("Test Business");
  });

  it("Testing as Business User 2: Should not be able to delete a business not assigned to their user_id", async () => {
    const { error } = await supabaseAnon
      .from("businesses")
      .delete()
      .eq("user_id", businessUser1ID)
      .select();

    const { data } = await supabaseAnon
      .from("businesses")
      .select()
      .eq("user_id", businessUser1ID);
    expect(data![0].name).toEqual("Test Business");
  });

  it("Test Conclusion: Successful sign out of Business User 2 and Deletion Of Remaining Test Business", async () => {
    const { error } = await supabaseAnon.auth.signOut();
    expect(error).toEqual(null);

    const { data } = await supabaseService
      .from("businesses")
      .delete()
      .eq("user_id", businessUser1ID)
      .select();
    expect(data![0].user_id).toEqual(businessUser1ID);
  });
});
