import { supabaseAnon, supabaseService } from "../../jest.setup";

// that a user cant update another users profile info
// that when a new business is registered it generates a business ID
// When a new deal is created it also assigns the correct business ID

// when a deal is deleted by a business it removes that deal from DB

// That a consumer user type CANNOT create new deals
// that a consumer user type CANNOT assign there own business ID

// That a user CANNOT VIEW another users profile information
// That a user CANNOT UPDATE another users profile information
// That a user CANNOT DELETE another users profile information

const businessUser1 = {
  email: "fawiwe3771@moneyzon.com",
  password: "password123",
};

const businessUser1ID = "44437ab8-2ab2-49d6-a71a-fe8f49f39032";

const businessUser2 = {
  email: "bilisaw709@quamox.com",
  password: "password123",
};

describe("Supabase Testing for Businesses Table RLS", () => {
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

  //   // it("Testing as Business User: Should be able to delete a business", async () => {
  //   //   const { data: { user } } = await supabaseAnon.auth.getUser()
  //   //   try {
  //   //     // Check if the business exists
  //   //     const business = await supabaseAnon
  //   //       .from("businesses")
  //   //       .eq("user_id", user?.id)
  //   //       .select()
  //   //       .first();
  //   //     if (!business) {
  //   //       throw new Error("Business not found");
  //   //     }

  //   //     const response = await supabaseAnon.transact(async (tx) => {
  //   //       // Update the foreign key in the profiles table
  //   //       await tx.from("profiles")
  //   //         .update({ business_id: null })
  //   //         .eq("business_id", business.id)
  //   //         .select();

  //   //       // Delete the business
  //   //       await tx.from("businesses")
  //   //         .delete()
  //   //         .eq("id", business.id)
  //   //         .select();
  //   //     });
  //   //     console.log("Business deleted successfully");
  //   //     expect(response.status).toEqual(200);
  //   //   } catch (error) {
  //   //     console.error(error);
  //   //   }
  // });
});
