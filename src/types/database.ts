export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: {
      next_registration_code: {
        Args: { competition_id_input: string };
        Returns: string;
      };
      check_registration_status: {
        Args: { registration_code_input: string; contact_input: string };
        Returns: unknown;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
