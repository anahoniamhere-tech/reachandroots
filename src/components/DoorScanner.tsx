import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { db, doc, getDoc } from '../lib/firebase';
import { AdminService } from '../services/adminService';
import { Order } from '../types';
import { CheckCircle, XCircle, AlertTriangle, Loader2, RefreshCcw, Camera } from 'lucide-react';

export const DoorScanner = () => {
  const [scannedOrder, setScannedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'already_scanned' | 'unpaid' | 'invalid'>('idle');
  const [scannerInstance, setScannerInstance] = useState<any>(null);

  useEffect(() => {
    // Initialize scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    setScannerInstance(scanner);

    scanner.render(
      (decodedText) => {
        // Pause scanning while we process
        scanner.pause();
        handleScan(decodedText, scanner);
      },
      (error) => {
        // ignore scan failures
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  const handleScan = async (payload: string, scanner: any) => {
    try {
      setLoading(true);
      setError(null);
      setStatus('idle');
      setScannedOrder(null);
      
      const decodedStr = atob(payload);
      const data = JSON.parse(decodedStr);
      
      if (!data.oid) {
        throw new Error("Invalid QR Code Format");
      }

      const orderRef = doc(db, 'orders', data.oid);
      const orderSnap = await getDoc(orderRef);
      
      if (!orderSnap.exists()) {
        setStatus('invalid');
        throw new Error("Ticket not found in database");
      }

      const order = { id: orderSnap.id, ...orderSnap.data() } as Order;
      setScannedOrder(order);

      if (order.status !== 'paid') {
        setStatus('unpaid');
      } else if (order.checkedIn) {
        setStatus('already_scanned');
      } else {
        setStatus('success');
      }
    } catch(err: any) {
      console.error(err);
      setStatus('invalid');
      setError(err.message || "Failed to process QR code");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!scannedOrder || !scannedOrder.id) return;
    try {
      setLoading(true);
      const success = await AdminService.checkInTicket(scannedOrder.id);
      if (success) {
        setScannedOrder(prev => prev ? { ...prev, checkedIn: true } : null);
        setStatus('already_scanned');
      } else {
        setError("Failed to update database. Try again.");
      }
    } catch (err: any) {
      setError("Error checking in: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setScannedOrder(null);
    setError(null);
    setStatus('idle');
    if (scannerInstance) {
      scannerInstance.resume();
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-brand-navy/5 shadow-2xl max-w-2xl mx-auto flex flex-col items-center">
      <div className="mb-8 text-center">
        <span className="editorial-label text-brand-coral font-bold italic">SCANNER</span>
        <h3 className="editorial-h2 text-brand-navy mt-2 text-2xl font-bold uppercase tracking-tight">
          Door Entry
        </h3>
        <p className="font-body text-brand-navy/60 text-sm mt-2 max-w-sm mx-auto">
          Scan a ticket QR code to verify validity and check guests in.
        </p>
      </div>

      <div className="w-full relative">
        <div id="qr-reader" className="w-full overflow-hidden rounded-2xl border-2 border-brand-navy/10 bg-brand-navy/5" />
        
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl">
            <Loader2 className="w-8 h-8 text-brand-coral animate-spin mb-2" />
            <span className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Processing...</span>
          </div>
        )}
      </div>

      {/* Result Section */}
      {status !== 'idle' && (
        <div className={`mt-8 w-full p-6 rounded-2xl border-2 transition-all ${
          status === 'success' ? 'bg-green-50 border-green-200' :
          status === 'already_scanned' ? 'bg-yellow-50 border-yellow-200' :
          'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            {status === 'success' && <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />}
            {status === 'already_scanned' && <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />}
            {(status === 'unpaid' || status === 'invalid') && <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />}
            
            <div>
              <h4 className={`font-display font-bold text-xl uppercase tracking-tight ${
                status === 'success' ? 'text-green-700' :
                status === 'already_scanned' ? 'text-yellow-700' :
                'text-red-700'
              }`}>
                {status === 'success' ? 'Valid Ticket' :
                 status === 'already_scanned' ? 'Already Checked In' :
                 status === 'unpaid' ? 'Unpaid Ticket' : 'Invalid Ticket'}
              </h4>
              {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
            </div>
          </div>

          {scannedOrder && (
            <div className="bg-white/60 p-4 rounded-xl space-y-2 text-sm font-body font-medium">
              <p><span className="text-brand-navy/50 uppercase tracking-widest text-xs">Name:</span> <span className="font-bold text-brand-navy">{scannedOrder.buyerInfo?.fullName || 'N/A'}</span></p>
              <p><span className="text-brand-navy/50 uppercase tracking-widest text-xs">Tier:</span> <span className="font-bold text-brand-navy">{scannedOrder.tierId}</span></p>
              <p><span className="text-brand-navy/50 uppercase tracking-widest text-xs">Status:</span> <span className="font-bold text-brand-navy uppercase">{scannedOrder.status}</span></p>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {status === 'success' && (
              <button 
                onClick={handleCheckIn}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} /> Check In Guest
              </button>
            )}
            
            <button 
              onClick={handleReset}
              className="flex-1 bg-white hover:bg-brand-navy/5 border border-brand-navy/10 text-brand-navy py-3 px-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw size={16} /> Scan Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
