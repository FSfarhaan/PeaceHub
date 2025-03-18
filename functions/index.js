const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.deleteOldMessages = functions.pubsub
    .schedule("every 24 hours")
    .onRun(async (context) => {
      const now = admin.firestore.Timestamp.now();
      const communitiesRef = db.collection("communities");

      const communities = await communitiesRef.get();

      const batch = db.batch();

      for (const communityDoc of communities.docs) {
        const messagesRef = communityDoc.ref.collection("messages");
        const old = await messagesRef.where("deleteAt", "<=", now).get();

        old.forEach((doc) => batch.delete(doc.ref));
      }

      await batch.commit();

      console.log("✅ Deleted expired messages.");
    });
