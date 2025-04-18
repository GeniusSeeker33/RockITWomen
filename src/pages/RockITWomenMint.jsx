// RockITWomenMint.jsx — HashPack Extension (SSR-safe)
import React, { useState, useEffect, useRef } from 'react';
import { HashConnect } from 'hashconnect';

const METADATA_URIS = {
  innovate: 'ipfs://QmYxnuchPoDgf3Drkdt3WCruUi8tdGdRMeHTZXnqW7zigw',
  empower: 'ipfs://QmVW2epRQVdkCNdKFomzNnD3s42LXL9cY3S1xpvRjFjbtL',
  connect: 'ipfs://QmNySNsiKcqKx7aeJa2pNTRURVLnX7WwijHqigjfJ3vC8Q'
};

const TOKEN_ID = '0.0.9099972';

export default function RockITWomenMint() {
  const [badgeType, setBadgeType] = useState('empower');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const hashconnectRef = useRef(null);
  const initDataRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (async () => {
        const hashconnect = new HashConnect();
        const appMetadata = {
          name: 'RockIT Women Minting App',
          description: 'Official badge minting for RockIT Women 2025',
          icon: 'https://rockitwomen.com/logo.png'
        };

        try {
          const initData = await hashconnect.init(appMetadata, 'mainnet', false);
          await hashconnect.connectToLocalWallet();

          hashconnectRef.current = hashconnect;
          initDataRef.current = initData;
        } catch (err) {
          console.error('HashConnect init error:', err);
        }
      })();
    }
  }, []);

  const mintBadge = async () => {
    try {
      setStatus('Connecting to HashPack...');
      setLoading(true);

      const hashconnect = hashconnectRef.current;
      const initData = initDataRef.current;

      if (!hashconnect || !initData) {
        setStatus('❌ Wallet not initialized. Please refresh.');
        return;
      }

      // Wait briefly for wallet pairing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pairingData = {
        topic: initData.topic,
        accountIds: initData.pairedAccounts
      };

      if (!pairingData.accountIds || !pairingData.accountIds[0]) {
        setStatus('❌ Wallet pairing failed or no account returned.');
        return;
      }

      const provider = hashconnect.getProvider('mainnet', pairingData.topic, pairingData.accountIds[0]);
      const signer = hashconnect.getSigner(provider);

      setStatus('Minting NFT...');

      const transaction = await signer.mint({
        tokenId: TOKEN_ID,
        metadata: [Buffer.from(METADATA_URIS[badgeType])],
        maxTransactionFee: 200000000
      });

      const receipt = await transaction.getReceipt(provider);
      setStatus(`✅ NFT Minted! Status: ${receipt.status.toString()}`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Minting failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-xl max-w-lg w-full mx-auto mt-12">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">🎟️ Mint Your RockIT Women 2025 Badge</h1>

      <label className="block mb-2 font-semibold">Select Badge Type</label>
      <select
        value={badgeType}
        onChange={(e) => setBadgeType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="innovate">🌟 Innovate (Speaker)</option>
        <option value="empower">💪 Empower (Attendee)</option>
        <option value="connect">🔗 Connect (Sponsor)</option>
      </select>

      <button
        onClick={mintBadge}
        className={`w-full py-2 rounded text-white font-semibold transition duration-200 ${loading ? 'bg-gray-400' : 'bg-purple-700 hover:bg-purple-800'}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Mint Badge'}
      </button>

      {status && <p className="mt-4 text-center text-sm font-medium">{status}</p>}
    </div>
  );
}







